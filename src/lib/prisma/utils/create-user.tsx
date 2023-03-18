import { Prisma } from '@prisma/client'
import { prisma } from '..'

export async function createUser(user: Prisma.UserCreateInput) {
  const createdUser = await prisma.user.create({
    data: user,
  })

  return createdUser
}
