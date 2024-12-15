import { z } from "zod"

export const idSchema = z.object({
  id: z.string()
})

export const timeSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

