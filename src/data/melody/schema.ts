import {
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxJsonSchema
} from 'rxdb';
import { zodToJsonSchema } from "zod-to-json-schema"

import { z } from "zod";

import { idSchema, timeSchema } from "~data/baseZodSchema"
import { noteSchema, newZodNote } from "./note"


export const melodyZodSchema = z.object({
  title: z.string().nullable(),
  notes: z.array(noteSchema)
}).merge(idSchema).merge(timeSchema)


export const melodyJsonSchema = zodToJsonSchema(melodyZodSchema, {
  name: "melodySchema",
  nameStrategy: "title",
  $refStrategy: "none"
})

const melodySchemaLiteral = {
  ...melodyJsonSchema,
  version: 0,
  type: "object",
  primaryKey: "id",
} as const;
const schemaTyped = toTypedRxJsonSchema(melodySchemaLiteral);

export type MelodyDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
// @ts-ignore
export const melodyRxSchema: RxJsonSchema<MelodyDocType> = melodySchemaLiteral;
