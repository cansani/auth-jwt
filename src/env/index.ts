import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  PORT: z.coerce.number().default(3333),
  JWT_PASSWORD: z.string()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
