import { v4 as uuid } from 'uuid';
import { z } from "zod";

import { idSchema, timeSchema } from "~models/base"
import { noteSchema, newNote } from "./Note"


export const melodySchema = z.object({
  title: z.string().nullable(),
  notes: z.array(noteSchema)
}).merge(idSchema).merge(timeSchema)

export type Melody = z.infer<typeof melodySchema>

export const newMelody = () => {
  return {
    ...melodySchema.parse({
      id: "mel" + uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: null,
      notes: [newNote()]
    })
  }
}