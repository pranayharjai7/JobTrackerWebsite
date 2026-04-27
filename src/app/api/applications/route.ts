import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getAIProvider } from "@/lib/ai"
import { applicationSchema } from "@/lib/validations"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const applications = await prisma.application.findMany({
      where: { userId: session.user.id },
      include: {
        emails: {
          orderBy: { timestamp: "desc" }
        }
      },
      orderBy: { lastUpdate: "desc" }
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Failed to fetch applications:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedData = applicationSchema.parse(body)
    const { company, role, status, location, appliedDate } = validatedData

    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        company,
        role,
        status,
        location,
        appliedDate: new Date(appliedDate),
        lastUpdate: new Date(),
      }
    })

    // Generate initial AI Analysis for manual application
    try {
      const aiProvider = getAIProvider()
      if (aiProvider.analyzeApplication) {
        const analysis = await aiProvider.analyzeApplication({
          company,
          role,
          status,
          emails: [] // No emails yet for manual add
        })

        await prisma.application.update({
          where: { id: application.id },
          data: {
            summary: analysis.summary,
            aiAnalysis: analysis as any,
          }
        })
      }
    } catch (aiError) {
      console.error("AI Analysis failed for manual application:", aiError)
    }

    return NextResponse.json(application)
  } catch (error: any) {
    console.error("Failed to create application:", error)
    if (error.name === "ZodError") {
      return new NextResponse(JSON.stringify({ message: "Invalid input data", errors: error.errors }), { status: 400 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
