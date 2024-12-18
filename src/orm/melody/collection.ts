import { type RxCollection } from "rxdb"

import { type MelodyDocType, melodyRxSchema } from "~orm/melody/schema"
import { v4 as uuid } from "uuid"
import { newZodNote } from "~zodSchemas/Note"
import { melodyZodSchema } from "~zodSchemas/Melody"

type MelodyMethods = {}
type MelodyStatics = {
  newMelody: () => Promise<MelodyDocType>
}
export type MelodyCollection = RxCollection<MelodyDocType, MelodyMethods, MelodyStatics>



const melodyMethods = {}

const melodyStatics: MelodyStatics = {
  newMelody: async (this: MelodyCollection) => {
    let mel = {
      ...melodyZodSchema.parse({
        id: uuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: null,
        notes: [newZodNote()]
      })
    }
    const melody: MelodyDocType = await this.insert(mel)
    return melody
  }
}

const melodyCollection: MelodyCollection = {
  schema: melodyRxSchema,
  methods: melodyMethods,
  statics: melodyStatics,
}

export default melodyCollection