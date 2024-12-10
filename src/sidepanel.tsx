import React from "react"
import { createMemoryRouter, createRoutesFromElements, Route } from "react-router"

import App from "./App"
import SidePanelLayout from "~components/SidePanelLayout"
import { MelodyList, Melody, NewMelody } from "~components/Melodies"

const IndexSidePanel: React.FC = () => {
  // const router = createMemoryRouter(
  //   createRoutesFromElements(
  //     <Route element={<SidePanelLayout />}>
  //       <Route index element={<MelodyList />} />
  //       <Route path="new" element={<NewMelody />} />
  //       <Route path=":melodyId" element={<Melody />} />
  //     </Route>
  //   )
  // )
  return (
    <App entrypoint="sidepanel" />
  )
}

export default IndexSidePanel
