import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~components/ui/sidebar"
import { NavLink } from "react-router"
import { Loader, Music3 } from "lucide-react"
import React from "react"
import type { MelodyCollection } from "~data/melody/collection"
import { useRxCollection, useRxQuery } from 'rxdb-hooks';


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
      {melodies.map((melody) => (
        <SidebarMenuItem key={melody.title}>
          <SidebarMenuButton asChild>
            <NavLink to={melody.id}>
              <Music3 />
              <span>{melody.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export default MelodySidebarMenu