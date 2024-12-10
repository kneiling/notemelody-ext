import React, { StrictMode } from "react"
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router"
import { useStorage } from "@plasmohq/storage/hook"
import { Storage } from "@plasmohq/storage"

import { Person } from "~models/Person"

import { Layout } from "~components/Layout"
import { MelodyComposer, MelodyList, NewMelody } from "~components/Melodies"
import { Account } from "~components/Account"

import './style.css'

interface AppProps {
  entrypoint: string
}

const App: React.FC<AppProps> = ({entrypoint}) => {

  const [user] = useStorage<Person>({
    key: "user",
    instance: new Storage({
      area: "local"
    })
  })

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

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

export default App