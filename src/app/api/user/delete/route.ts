import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // Delete the user (cascades to applications, accounts, etc. if set up in prisma)
    await prisma.user.delete({
      where: { id: session.user.id },
    })

    return new NextResponse("Account deleted", { status: 200 })
  } catch (error) {
    console.error("Account deletion error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
