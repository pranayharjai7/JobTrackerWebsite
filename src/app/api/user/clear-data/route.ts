import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // Delete all applications for this user
    // This will cascade delete related Emails and Events
    await prisma.application.deleteMany({
      where: { userId: session.user.id },
    })

    return new NextResponse("All data cleared successfully", { status: 200 })
  } catch (error) {
    console.error("Clear data error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
