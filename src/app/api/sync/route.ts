import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { syncEmails } from "@/lib/gmail"

export async function POST() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const logs = await syncEmails(session.user.id)
    return NextResponse.json({ success: true, logs })
  } catch (error) {
    console.error("Sync error detailed:", error)
    const message = error instanceof Error ? error.message : "Internal Server Error"
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
