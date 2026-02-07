import { PrismaClient } from "../generated/prisma"
import { PrismaNeon } from '@prisma/adapter-neon'
import dotenv from 'dotenv'

dotenv.config()
const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaNeon({ connectionString })
export const prisma = new PrismaClient({ adapter })

/*
import { PrismaClient } from "@prisma/client"

import { Pool } from 'pg' 
import { withPg } from '@prisma/adapter-pg' // Create a native pg Pool const pool = new Pool({ connectionString: process.env.DATABASE_URL, }) // Wrap it with Prisma’s adapter const adapter = withPg(pool)

const pool = new Pool({ connectionString: process.env.DATABASE_URL, })

const adapter = withPg(pool)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ?? 
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma*/
