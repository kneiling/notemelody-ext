import React from 'react'
import { Outlet, useParams } from "react-router"
import { useRxCollection, useRxQuery } from 'rxdb-hooks'
import { useStorage } from "@plasmohq/storage/hook"

import {melodyRxSchema, melodyJsonSchema} from "~rxdb/Schema"

export const MelodyList: React.FC = () => {
  return (
    <div>
      <h2>melodyRxSchema</h2>
      <pre>{JSON.stringify(melodyRxSchema, null, 2)}</pre>

      <h2>melodyJsonSchema</h2>
      <pre>{JSON.stringify(melodyJsonSchema, null, 2)}</pre>
    </div>
  )
}

export const MelodyComposer: React.FC = () => {
  let params = useParams()

  const collection = useRxCollection("melodies")
  const {result: melody, isFetching} = useRxQuery(collection?.findOne().where("id").equals(params.id))


  return (
    <>
      <h2>Params</h2>
      <pre>{JSON.stringify(params, null, 2)}</pre>

      <h2>Melody</h2>
      {isFetching && <div>Loading...</div>}
      <pre>{JSON.stringify(melody, null, 2)}</pre>
    </>
  )
}

export const NewMelody: React.FC = () => {
  return (
    <div>
      <h1>New Melody</h1>

      <h2>melodyRxSchema</h2>
      <pre>{JSON.stringify(melodyRxSchema, null, 2)}</pre>

      <h2>melodyJsonSchema</h2>
      <pre>{JSON.stringify(melodyJsonSchema, null, 2)}</pre>
    </div>
  )
}
