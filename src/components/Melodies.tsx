import React from 'react';
import { NavLink, Outlet, useLocation, useParams } from "react-router";
import type { RxCollection } from "rxdb";
import { useRxCollection, useRxData, useRxQuery } from "rxdb-hooks"

import { melodyJsonSchema, melodyRxSchema, type MelodyDocType } from "~data/melody/schema";
import type { MelodyCollection } from "~data/melody/collection"
import { Loader } from "lucide-react"

export const MelodyHelp: React.FC = () => {

  return (
    <div>
      <h1>NoteMelody!!</h1>

      <h2>melodyRxSchema</h2>
      <pre>{JSON.stringify(melodyRxSchema, null, 2)}</pre>

      <h2>melodyJsonSchema</h2>
      <pre>{JSON.stringify(melodyJsonSchema, null, 2)}</pre>
    </div>
  )
}

export const MelodyList: React.FC = () => {
  const queryConstructor = React.useCallback(
    (collection: RxCollection) => collection.find(),
    []
  )
  const { result: melodies, isFetching } = useRxData('melodies', queryConstructor)

  return (
    <div>
      <h2>All yo melodies</h2>

      <ul>
        {isFetching && <li><Loader /></li>}

        {melodies.map((melody: MelodyDocType) => (
          <li>
            <NavLink to={melody.id}>
              {melody.id}: {melody.title || "no title"}, created: {new Date(melody.createdAt).toLocaleString()}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
