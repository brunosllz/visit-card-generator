import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const registerBodySchema = z.object({
  name: z.string().transform((name) => name.toLowerCase().replace(/\//g, '')),
  username: z.string().regex(/^([a-z\d\-]+)$/i),
  description: z.string(),
  email: z.string().email(),
  github: z
    .string()
    .regex(/^([a-z\d\-]+)$/i)
    .transform((github) => github.toLowerCase().replace(/\//g, '')),
  linkedin: z
    .string()
    .regex(/^([a-z\d\-]+)$/i)
    .transform((linkedin) => linkedin.toLowerCase().replace(/\//g, '')),
  imageUrl: z.string().nullable(),
  cardBackgroundColor: z
    .string()
    .transform((cardBackgroundColor) => cardBackgroundColor.toUpperCase()),
  cardTextColor: z
    .string()
    .transform((cardTextColor) => cardTextColor.toUpperCase()),
})

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  const registerBody = registerBodySchema.safeParse(request.body)

  if (registerBody.success === false) {
    return response.status(409).json(registerBody.error.format())
  }

  const {
    data: {
      description,
      email,
      github,
      imageUrl,
      linkedin,
      name,
      username,
      cardBackgroundColor,
      cardTextColor,
    },
  } = registerBody

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return response.status(409).json({ message: 'User already exists.' })
  }

  const user = await prisma.user.create({
    data: {
      description,
      email,
      github,
      linkedin,
      name,
      username,
      image_url: imageUrl,
      card_background_color: cardBackgroundColor,
      card_text_color: cardTextColor,
    },
  })

  return response.status(201).json(user)
}
