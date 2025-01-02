import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~components/ui/sidebar"
import { NavLink } from "react-router"
import { Loader, Music3 } from "lucide-react"
import React from "react"
import type { MelodyCollection } from "~data/melody/collection"
import { useRxCollection, useRxQuery } from 'rxdb-hooks';
import type { MelodyDocType } from "~data/melody/schema"


const MelodySidebarMenu: React.FC = () => {

  const collection: MelodyCollection | null = useRxCollection('melodies')

  const {result: melodies, isFetching} = useRxQuery(collection?.find())

  if (isFetching) {
    return (
      <SidebarMenu>
        <Loader />
      </SidebarMenu>
    )
  }
  return (
    <SidebarMenu>
      { isFetching && <Loader /> }

      {melodies.map((melody: MelodyDocType) => (
        <SidebarMenuItem key={melody.id}>
          <SidebarMenuButton asChild>
            <NavLink to={melody.id}>
              <Music3 />
              <span>{melody.id}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export default MelodySidebarMenu