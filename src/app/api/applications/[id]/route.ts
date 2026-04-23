import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const body = await req.json()
    const { company, role, status, location, appliedDate } = body

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
  } catch (error) {
    console.error("Failed to update application:", error)
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
