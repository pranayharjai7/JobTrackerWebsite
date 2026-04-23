import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { name } = await req.json()

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("User update error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
