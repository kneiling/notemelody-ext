import React from 'react'
import { Outlet, useParams } from "react-router"

export const MelodyList: React.FC = () => {
  return (
    <div>
      <h1>Melody List</h1>
    </div>
  )
}

export const MelodyComposer: React.FC = () => {
  let params = useParams()

  return (
    <>
      <h1>Melody</h1>
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
