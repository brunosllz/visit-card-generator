import { prisma } from '..'

export async function findUserById(id: string) {
  const user = prisma.user.findUnique({
    where: {
      id,
    },
  })

  return user
}
