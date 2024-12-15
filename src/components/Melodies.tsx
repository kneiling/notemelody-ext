import React from 'react'
import { Outlet, useParams } from "react-router"
import { useStorage } from "@plasmohq/storage/hook"

export const MelodyList: React.FC = () => {
  return (
    <div>
      <h1>Melody List</h1>
    </div>
  )
}

export const MelodyComposer: React.FC = () => {
  let params = useParams()

  const [melody] = useStorage(params.melodyId)

  return (
    <>
      <h1>Melody</h1>
      <pre>{JSON.stringify(melody, null, 2)}</pre>
    </>
  )
}

export const NewMelody: React.FC = () => {
  return (
    <div>
      <h1>New Melody</h1>
    </div>
  )
}
