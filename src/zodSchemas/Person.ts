import { z } from "zod"
import { v4 as uuid } from 'uuid';
import { idSchema, timeSchema } from "~zodSchemas/base"

const personSchema = z.object({
  email: z.string().email().nullable(),
  is_superuser: z.boolean(),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }).nullable(),
}).merge(idSchema).merge(timeSchema)

export type Person = z.infer<typeof personSchema>

export function newPerson() {
  return {
    ...personSchema.parse({
      id: "per" + uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email: null,
      is_superuser: false,
      fullName: null
    })
  }
}

export const personFormSchema = personSchema.pick({
  email: true,
  fullName: true,
})

export const updatePerson = (person: Person, values: Partial<Person>) => {
  return {
    ...person,
    ...values,
    updatedAt: new Date().toISOString(),
  }
}