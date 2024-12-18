import { type RxCollection } from "rxdb"

import { type MelodyDocType, melodyRxSchema, melodyZodSchema } from "~data/melody/schema"
import { v4 as uuid } from "uuid"
import { newZodNote } from "~data/melody/note"

type MelodyMethods = {}
type MelodyStatics = {
  newMelody: () => Promise<MelodyDocType>
}
export type MelodyCollection = RxCollection<MelodyDocType, MelodyMethods, MelodyStatics>

const melodyMethods = {}

const melodyStatics: MelodyStatics = {
  newMelody: async function (this: MelodyCollection) {
    const melody: MelodyDocType = await this.insert({
      ...melodyZodSchema.parse({
        id: uuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: null,
        notes: [newZodNote()]
      })
    } as MelodyDocType)
    return melody
  }
}

const melodyCollection: MelodyCollection = {
  schema: melodyRxSchema,
  methods: melodyMethods,
  statics: melodyStatics,
}

export default melodyCollection