import React, { StrictMode, useEffect, useState } from "react"
import { Provider } from 'rxdb-hooks';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router"

import init from '~data/init'
import { Layout } from "~components/Layout"
import MelodyComposer from "~components/MelodyComposer"
import { MelodyList, MelodyHelp } from "~components/Melodies"
import { Account } from "~components/Account"

import './style.css'
import { removeRxDatabase } from "rxdb"
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie"

interface AppProps {
  entrypoint: string
}

const App: React.FC<AppProps> = ({entrypoint}) => {

  const router = createMemoryRouter(
    createRoutesFromElements(
      <Route element={<Layout />} >
        <Route index element={<MelodyHelp />} />
        <Route path="mels/:id" element={<MelodyComposer />} />
        <Route path="mels" element={<MelodyList />} />

        <Route path="account" element={<Account />} />
      </Route>
    )
  )

  const [db, setDb] = useState();

  useEffect(() => {
    // RxDB instantiation can be asynchronous
    removeRxDatabase('melody-db', getRxStorageDexie());
    init().then(setDb);
  }, []);

  return (
    <StrictMode>
      <Provider db={db}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  )
}

export default App