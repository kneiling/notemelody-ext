import { z } from "zod"
import { v4 as uuid } from 'uuid';

const personSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  email: z.string().email().nullable(),
  is_superuser: z.boolean(),
  full_name: z.string().nullable(),
})
export type Person = z.infer<typeof personSchema>

export function newPerson() {
  return {
    ...personSchema.parse({
      id: uuid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      email: null,
      is_superuser: false,
      full_name: null
    })
  }
}

