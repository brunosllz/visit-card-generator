import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  NEXT_PUBLIC_DEVELOPMENT_URL: z.string(),
  NEXT_PUBLIC_PRODUCTION_URL: z.string(),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_DEVELOPMENT_URL: process.env.NEXT_PUBLIC_DEVELOPMENT_URL,
  NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
})
