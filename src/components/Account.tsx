import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useStorage } from "@plasmohq/storage/dist/hook"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~components/ui/form"
import { Input } from "~components/ui/input"
import { Button } from "~components/ui/button"

import { type Person, newPerson, personFormSchema, updatePerson } from "~models/Person"


export const Account = () => {

  const [user, setUser] = useStorage<Person>("user")

  const [edit, setEdit] = useState(false)
  const toggleEdit = () => setEdit((prev) => !prev)

  return (
    <>
      <Account.Header>
        <h2>Account</h2>

        <Button onClick={toggleEdit}>
          {edit ? "Cancel" : "Edit"}
        </Button>

        <Button
          className="bg-destructive"
          onClick={() => setUser(newPerson())}
        >
          Reset Account
        </Button>
      </Account.Header>

      { edit ? (
        <Account.Form person={user} onSave={setUser} onCancel={toggleEdit} />
      ) : (
        <Account.View person={user} />
      )}
    </>
  )
}

Account.Header = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-between items-center">{children}</div>
)

Account.View = ({ person }: { person: Person }) => (
  <div className="person">
    <h4>Account Info</h4>
    <pre>{JSON.stringify(person, null, 2)}</pre>
  </div>
)

Account.Form = ({
  person,
  onSave,
  onCancel,
}: {
  person: Person
  onSave: (user: Person) => void
  onCancel: () => void
}) => {
  const form = useForm<z.infer<typeof personFormSchema>>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      fullName: person.fullName || "",
      email: person.email || "",
    },
  })

  const onSubmit = (data: z.infer<typeof personFormSchema>) => {
    const updatedPerson = updatePerson(person, data)
    onSave(updatedPerson) // Save and propagate state to parent
    onCancel() // Exit edit mode
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </Form>
  )
}