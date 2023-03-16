import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'GET') {
    return response.status(405).end()
  }

  const username = String(request.query.username)

  if (!username) {
    return response.status(400).json({ message: 'Resource not found.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (user) {
    return response.status(409).json({ message: 'User already exists.' })
  }

  return response.status(200).end()
}
