import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~components/ui/sidebar"
import { NavLink } from "react-router"
import { Loader, Music3 } from "lucide-react"
import React from "react"
import type { MelodyCollection } from "~data/melody/collection"
import { useRxCollection, useRxData, useRxQuery } from "rxdb-hooks"
import type { MelodyDocType } from "~data/melody/schema"
import type { RxCollection } from "rxdb"


const MelodySidebarMenu: React.FC = () => {
  const queryConstructor = React.useCallback(
    (collection: RxCollection) => collection.find(),
    []
  )
  const { result: melodies, isFetching } = useRxData('melodies', queryConstructor)

  return (
    <SidebarMenu>
      { isFetching && <Loader /> }

      {melodies.map((melody: MelodyDocType) => (
        <SidebarMenuItem key={melody.id}>
          <SidebarMenuButton asChild>
            <NavLink to={"mels/" + melody.id}>
              <Music3 />
              <span>{melody.title || melody.id}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export default MelodySidebarMenu