import { PrismaClient } from '@prisma/client'

export const prisma = PrismaClient({
  log: ['query'],
})
