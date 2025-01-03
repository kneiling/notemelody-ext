import React from "react";
import { useParams } from "react-router";
import { type RxCollection } from 'rxdb';
import { useRxData } from "rxdb-hooks";


const MelodyComposer: React.FC = () => {
  const { id } = useParams()

  const queryConstructor = React.useCallback(
    (collection: RxCollection) => collection.findOne(id),
    [id]
  )

  const { result: melody, isFetching } = useRxData('melodies', queryConstructor)

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