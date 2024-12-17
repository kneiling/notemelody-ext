import { v4 as uuid } from 'uuid';
import { z } from "zod"

import { idSchema, timeSchema } from "~zodSchemas/base"

export const citationSchema = z.object({
  content: z.string().nullable(),
}).merge(idSchema).merge(timeSchema)

export type Citation = z.infer<typeof citationSchema>