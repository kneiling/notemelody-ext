import { v4 as uuid } from 'uuid';
import { z } from "zod"

import { idSchema, timeSchema } from "~models/base"
import { citationSchema } from "~models/citation"

const baseNoteSchema = z.object({
  title: z.string().nullable(),
  citation: z.object({citationSchema}),
}).merge(idSchema).merge(timeSchema)

export type Note = z.infer<typeof baseNoteSchema> & {
  notes: Note[]
}

export const noteSchema: z.ZodType<Note> = baseNoteSchema.extend({
  notes: z.lazy(() => noteSchema.array()),
});