import React from 'react';
import { NavLink, Outlet, useLocation, useParams } from "react-router";
import type { RxCollection } from "rxdb";
import { useRxCollection, useRxQuery } from 'rxdb-hooks';

import { melodyJsonSchema, melodyRxSchema, type MelodyDocType } from "~data/melody/schema";

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
  const collection: RxCollection<MelodyDocType> | null =
    useRxCollection("melodies")
  const { result: melodies, isFetching } = useRxQuery(collection?.find(), {
    pageSize: 10,
    pagination: "Infinite"
  })

  if (isFetching) {
    return "Loading..."
  }

  return (
    <div>
      <h2>All yo melodies</h2>

      <ul>
        {melodies.map((melody) => (
          <li>
            <NavLink to={melody.id}>
              {melody.title} | {melody.id}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
