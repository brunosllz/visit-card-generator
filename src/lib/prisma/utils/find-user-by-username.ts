import { prisma } from '..'

export async function findUserByUsername(username: string) {
  const user = prisma.user.findUnique({
    where: {
      username,
    },
  })

  return user
}
