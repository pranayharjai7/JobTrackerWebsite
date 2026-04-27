import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { applicationUpdateSchema } from "@/lib/validations"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const body = await req.json()
    const validatedData = applicationUpdateSchema.parse(body)
    const { company, role, status, location, appliedDate } = validatedData

    const application = await prisma.application.update({
      where: {
        id: params.id,
        userId: session.user.id, // Security: Ensure user owns this app
      },
      data: {
        company,
        role,
        status,
        location,
        appliedDate: appliedDate ? new Date(appliedDate) : undefined,
        lastUpdate: new Date(),
      },
    })

    return NextResponse.json(application)
  } catch (error: any) {
    console.error("Failed to update application:", error)
    if (error.name === "ZodError") {
      return new NextResponse(JSON.stringify({ message: "Invalid input data", errors: error.errors }), { status: 400 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    await prisma.application.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Failed to delete application:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
