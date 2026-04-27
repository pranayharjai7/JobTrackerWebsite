import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { userUpdateSchema } from "@/lib/validations"

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedData = userUpdateSchema.parse(body)
    const { name } = validatedData

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error("User update error:", error)
    if (error.name === "ZodError") {
      return new NextResponse(JSON.stringify({ message: "Invalid input data", errors: error.errors }), { status: 400 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
