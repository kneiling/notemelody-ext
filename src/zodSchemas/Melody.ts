import { v4 as uuid } from 'uuid';
import { z } from "zod";

import { idSchema, timeSchema } from "~zodSchemas/base"
import { noteSchema, newNote } from "./Note"


export const melodyZodSchema = z.object({
  title: z.string().nullable(),
  notes: z.array(noteSchema)
}).merge(idSchema).merge(timeSchema)

export type Melody = z.infer<typeof melodyZodSchema>

export const newMelody = () => {
  return {
    ...melodyZodSchema.parse({
      id: uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: null,
      notes: [newNote()]
    })
  }
}