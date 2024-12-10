import React from "react"
import { useStorage } from "@plasmohq/storage/dist/hook"
import { Person, newPerson } from "~models/Person"
import { Button } from "~components/ui/button"

export const Account = () => {

  const [user, setUser] = useStorage<Person>("user")

  return (
    <>
      <h2>Account</h2>

      <div className="account">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>

      <Button className={"bg-destructive"} onClick={() => setUser(newPerson())}>
        Reset account
      </Button>
    </>
  )
}
