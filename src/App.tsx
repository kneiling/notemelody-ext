import React, { StrictMode, useEffect, useState } from "react"
import { Provider } from 'rxdb-hooks';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router"

import init from '~rxdb/init'
import { Layout } from "~components/Layout"
import { MelodyComposer, MelodyList, NewMelody } from "~components/Melodies"
import { Account } from "~components/Account"

import './style.css'

interface AppProps {
  entrypoint: string
}

const App: React.FC<AppProps> = ({entrypoint}) => {

  const router = createMemoryRouter(
    createRoutesFromElements(
      <Route element={<Layout />} >
        <Route index element={<NewMelody />} />
        <Route path=":melodyId" element={<MelodyComposer />} />
        <Route path="mels" element={<MelodyList />} />

        <Route path="account" element={<Account />} />
      </Route>
    )
  )

  const [db, setDb] = useState();

  useEffect(() => {
    // RxDB instantiation can be asynchronous
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