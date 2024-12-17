import {
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxJsonSchema
} from 'rxdb';
import { zodToJsonSchema } from "zod-to-json-schema"

import { melodyZodSchema } from "~zodSchemas/Melody"

export const melodyJsonSchema = zodToJsonSchema(melodyZodSchema, {name:"melodySchema", nameStrategy: "title"})

const melodySchemaLiteral = {
  ...melodyJsonSchema,
  version: 0,
  type: "object",
  primaryKey: "id",
  properties: {
    id: {
      type: "string",
      maxLength: 100
    }
  },
  required: [
    "id"
  ],
  additionalProperties: false
} as const;
const schemaTyped = toTypedRxJsonSchema(melodySchemaLiteral);

export type MelodyDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
// @ts-ignore
export const melodyRxSchema: RxJsonSchema<MelodyDocType> = melodySchemaLiteral;
