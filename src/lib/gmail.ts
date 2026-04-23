import { google } from "googleapis"
import { prisma } from "@/lib/prisma"
import { getAIProvider } from "@/lib/ai"

export async function getGmailClient(account: any) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )

  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : undefined,
  })

  oauth2Client.on("tokens", async (tokens) => {
    const updateData: any = {
      access_token: tokens.access_token,
      expires_at: tokens.expiry_date ? Math.floor(tokens.expiry_date / 1000) : undefined,
    }
    if (tokens.refresh_token) {
      updateData.refresh_token = tokens.refresh_token
    }

    await prisma.account.update({
      where: {
        provider_providerAccountId: {
          provider: "google",
          providerAccountId: account.providerAccountId,
        },
      },
      data: updateData,
    })
  })

  return google.gmail({ version: "v1", auth: oauth2Client })
}

export async function syncEmails(userId: string) {
  const accounts = await prisma.account.findMany({
    where: { userId, provider: "google" },
  })

  if (accounts.length === 0) {
    throw new Error("No Google accounts connected")
  }

  const aiProvider = getAIProvider()
  const allLogs: string[] = []

  for (const account of accounts) {
    console.log(`Syncing account: ${account.providerAccountId}`)
    const gmail = await getGmailClient(account)

    const res = await gmail.users.messages.list({
      userId: "me",
      q: 'subject:(application OR interview OR offer OR rejection OR "thank you for applying") -category:promotions',
      maxResults: 20,
    })

    const messages = res.data.messages || []
    console.log(`Found ${messages.length} messages for ${account.providerAccountId}`)

    for (const message of messages) {
      if (!message.id) continue

      const existingEmail = await prisma.email.findUnique({
        where: { gmailId: message.id },
      })

      if (existingEmail) continue

      const detail = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      })

      const payload = detail.data.payload
      const subject = detail.data.snippet || ""
      let body = ""

      if (payload?.parts) {
        body = payload.parts[0].body?.data || ""
      } else {
        body = payload?.body?.data || ""
      }

      const decodedBody = Buffer.from(body, "base64").toString("utf-8")
      const emailTimestamp = new Date(parseInt(detail.data.internalDate || Date.now().toString()))

      const parsedData = await aiProvider.parseJobEmail(decodedBody)

      if (parsedData && parsedData.confidence > 0.6 && parsedData.company && parsedData.role) {
        let application = await prisma.application.findFirst({
          where: {
            userId,
            company: { contains: parsedData.company, mode: "insensitive" },
            role: { contains: parsedData.role, mode: "insensitive" },
          },
        })

        if (!application) {
          application = await prisma.application.create({
            data: {
              userId,
              company: parsedData.company,
              role: parsedData.role,
              status: parsedData.status,
              location: parsedData.location,
              appliedDate: emailTimestamp,
              lastUpdate: emailTimestamp,
            },
          })
        } else {
          const isNewer = emailTimestamp > application.lastUpdate
          if (isNewer && application.status !== parsedData.status) {
            await prisma.application.update({
              where: { id: application.id },
              data: { 
                status: parsedData.status,
                lastUpdate: emailTimestamp
              },
            })
            
            await prisma.event.create({
              data: {
                applicationId: application.id,
                eventType: parsedData.status,
                date: emailTimestamp,
                notes: `Status auto-updated from email: "${subject}"`,
              },
            })
          }
        }

        await prisma.email.create({
          data: {
            applicationId: application.id,
            gmailId: message.id!,
            subject: subject,
            bodySnippet: decodedBody.substring(0, 500),
            timestamp: emailTimestamp,
          },
        })

        // Generate AI Analysis after syncing the new email
        try {
          const updatedAppWithEmails = await prisma.application.findUnique({
            where: { id: application.id },
            include: { emails: { orderBy: { timestamp: "desc" } } }
          })

          if (updatedAppWithEmails && aiProvider.analyzeApplication) {
            const analysis = await aiProvider.analyzeApplication(updatedAppWithEmails)
            await prisma.application.update({
              where: { id: application.id },
              data: {
                summary: analysis.summary,
                aiAnalysis: analysis as any,
                lastUpdate: new Date()
              }
            })
          }
        } catch (aiError) {
          console.error("AI Analysis failed during sync:", aiError)
        }

        allLogs.push(`[${account.providerAccountId}] Parsed email from ${parsedData.company}: ${parsedData.status}`)
      }
    }
  }

  // Backfill: Generate analysis for any application that has emails but no summary
  const appsWithoutSummary = await prisma.application.findMany({
    where: { 
      userId,
      summary: null
    },
    include: { emails: { orderBy: { timestamp: "desc" } } }
  })

  if (appsWithoutSummary.length > 0 && aiProvider.analyzeApplication) {
    console.log(`Backfilling AI analysis for ${appsWithoutSummary.length} applications`)
    for (const app of appsWithoutSummary) {
      try {
        const analysis = await aiProvider.analyzeApplication(app)
        await prisma.application.update({
          where: { id: app.id },
          data: {
            summary: analysis.summary,
            aiAnalysis: analysis as any,
          }
        })
        allLogs.push(`Backfilled AI analysis for ${app.company}`)
      } catch (error) {
        console.error(`Failed to backfill analysis for ${app.company}:`, error)
      }
    }
  }

  return allLogs
}
