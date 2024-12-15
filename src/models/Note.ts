import { v4 as uuid } from 'uuid';
import { z } from "zod"

import { idSchema, timeSchema } from "~models/base"
import { citationSchema } from "~models/Citation"

const baseNoteSchema = z.object({
  title: z.string().nullable(),
  citation: z.object({citationSchema}).nullable(),
}).merge(idSchema).merge(timeSchema)

export type Note = z.infer<typeof baseNoteSchema> & {
  notes: Note[]
}

export const noteSchema: z.ZodType<Note> = baseNoteSchema.extend({
  notes: z.lazy(() => noteSchema.array()),
});

export const newNote = () => {
  return {
    ...noteSchema.parse({
      id: "n" + uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: null,
      citation: null,
      notes: []
    })
  }
}