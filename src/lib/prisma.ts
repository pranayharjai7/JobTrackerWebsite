import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const createPrismaClient = () => {
  console.log("Creating new PrismaClient instance...")
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({
      adapter,
      log: ["query", "error", "warn"],
    })
  } catch (error) {
    console.error("Failed to create PrismaClient:", error)
    throw error
  }
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
