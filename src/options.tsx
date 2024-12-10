import React from "react"
import { createMemoryRouter, createRoutesFromElements, Route } from "react-router"

import App from "./App"
import OptionsLayout from "~components/OptionsLayout"
import { Account, Theme } from "./components/Account"
import { OptionsMelodyList } from "~components/Melodies"

const IndexOptions:React.FC = () => {
  // const router = createMemoryRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<OptionsLayout />}>
  //       <Route index element={<OptionsMelodyList />} />
  //       <Route path={"account"} element={<Account />} />
  //       <Route path={"theme"} element={<Theme />} />
  //     </Route>
  //   )
  // )
  return (
    <App entrypoint="options" />
  )
}

export default IndexOptions
