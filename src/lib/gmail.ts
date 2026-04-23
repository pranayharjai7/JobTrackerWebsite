import { google } from "googleapis"
import { prisma } from "@/lib/prisma"
import { getAIProvider } from "@/lib/ai"

export async function getGmailClient(userId: string) {
  console.log("Getting Gmail client for user:", userId)
  const account = await prisma.account.findFirst({
    where: { userId, provider: "google" },
  })

  if (!account || !account.access_token) {
    console.error("No Google account found for user", userId)
    throw new Error("User has no Google account connected")
  }
  console.log("Found account for providerAccountId:", account.providerAccountId)

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )

  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : undefined,
  })

  // Handle token refresh
  oauth2Client.on("tokens", async (tokens) => {
    if (tokens.refresh_token) {
      await prisma.account.update({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: account.providerAccountId,
          },
        },
        data: {
          refresh_token: tokens.refresh_token,
          access_token: tokens.access_token,
          expires_at: tokens.expiry_date ? Math.floor(tokens.expiry_date / 1000) : undefined,
        },
      })
    } else {
      await prisma.account.update({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: account.providerAccountId,
          },
        },
        data: {
          access_token: tokens.access_token,
          expires_at: tokens.expiry_date ? Math.floor(tokens.expiry_date / 1000) : undefined,
        },
      })
    }
  })

  return google.gmail({ version: "v1", auth: oauth2Client })
}

export async function syncEmails(userId: string) {
  const gmail = await getGmailClient(userId)
  const aiProvider = getAIProvider()

  console.log("Searching for emails...")
  // Search for job-related emails
  const res = await gmail.users.messages.list({
    userId: "me",
    q: 'subject:(application OR interview OR offer OR rejection OR "thank you for applying") -category:promotions',
    maxResults: 20, // Start small for dev
  })

  const messages = res.data.messages || []
  console.log(`Found ${messages.length} potential messages.`)
  const logs: string[] = []

  for (const message of messages) {
    if (!message.id) continue

    // Check if we already processed this email
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

    // Decode base64 body
    const decodedBody = Buffer.from(body, "base64").toString("utf-8")
    const emailTimestamp = new Date(parseInt(detail.data.internalDate || Date.now().toString()))

    console.log(`Parsing email ${message.id} with AI...`)
    // Parse with AI
    const parsedData = await aiProvider.parseJobEmail(decodedBody)
    console.log(`AI result for ${message.id}:`, parsedData)

    if (parsedData && parsedData.confidence > 0.6 && parsedData.company && parsedData.role) {
      // Find or create application
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
        // Update status if it changed and the email is newer
        const isNewer = emailTimestamp > application.lastUpdate
        if (isNewer && application.status !== parsedData.status) {
          await prisma.application.update({
            where: { id: application.id },
            data: { 
              status: parsedData.status,
              lastUpdate: emailTimestamp
            },
          })
          
          // Add event
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

      // Store email record
      await prisma.email.create({
        data: {
          applicationId: application.id,
          gmailId: message.id!,
          subject: subject,
          bodySnippet: decodedBody.substring(0, 500), // Only store snippet as per user rule
          timestamp: emailTimestamp,
        },
      })

      logs.push(`Parsed email from ${parsedData.company}: Status changed -> ${parsedData.status}`)
    }
  }

  return logs
}
