import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PRODUCTION_URL: z.string(),
  DEVELOPMENT_URL: z.string(),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PRODUCTION_URL: process.env.PRODUCTION_URL ?? '',
  DEVELOPMENT_URL: process.env.DEVELOPMENT_URL ?? '',
})

console.log(process.env.PRODUCTION_URL)
