import { z } from "zod"

export const idSchema = z.object({
  id: z.string().max(100)
})

export const timeSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

