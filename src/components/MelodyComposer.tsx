import React from "react";
import { useParams } from "react-router";
import { useRxCollection, useRxQuery } from "rxdb-hooks";


const MelodyComposer: React.FC = () => {
  const { id } = useParams()
  const collection = useRxCollection("melodies")

  const {
    result: melody,
    isFetching
  } = useRxQuery(
    collection?.findOne(id),
    {
      enabled: !!id && !!collection,
    }
  )

  return (
    <>
      <h2>Melody</h2>
      {isFetching && <div>Loading...</div>}

      {melody ? (
        <pre>{JSON.stringify(melody, null, 2)}</pre>
      ) : (
        <div>No Melody Found</div>
      )}
    </>
  )
}

export default MelodyComposer