import React from "react"
import { useParams } from "react-router"
import { useRxCollection, useRxQuery } from "rxdb-hooks"

const MelodyComposer: React.FC = () => {
  let params = useParams()

  const collection = useRxCollection("melodies")
  const {
    result: melody,
    isFetching
  } = useRxQuery(
    collection?.findOne().where("id").equals(params.id)
  )

  return (
    <>
      <h2>Melody</h2>
      {isFetching && <div>Loading...</div>}
      <pre>{JSON.stringify(melody, null, 2)}</pre>
    </>
  )
}

export default MelodyComposer