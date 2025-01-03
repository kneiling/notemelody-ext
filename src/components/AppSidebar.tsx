import React from "react"
import { NavLink, useNavigate } from "react-router"
import {Storage} from "@plasmohq/storage"
import { useRxCollection, useRxQuery } from 'rxdb-hooks';

import { UserRoundCog, Music2, Music3, Music4, X, ListMusic, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "~components/ui/sidebar"
import MelodySidebarMenu from "~components/MelodySidebarMenu"

import type { MelodyCollection } from "~data/melody/collection"
import type { MelodyDocType } from "~data/melody/schema"


export const AppSidebar: React.FC = () => {
  const {setOpen} = useSidebar()
  const navigate = useNavigate()

  const createNewMelody = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    db.melodies.newMelody().then(
      (melody: MelodyDocType)=> navigate(`mels/${melody.id}`, {replace: true})
    )
    .catch(
      (error) => console.error(error)
    )
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex justify-end">
          <SidebarTrigger icon={<X />} />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <SidebarMenuButton asChild>
                <NavLink to="mels">
                  {/*<ListMusic />*/}
                  <span>Melodies</span>
                </NavLink>
              </SidebarMenuButton>

              <SidebarMenuAction onClick={createNewMelody}>
                <Plus /> <span className="sr-only">Add Melody</span>
              </SidebarMenuAction>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <MelodySidebarMenu />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="account">
                  <UserRoundCog />
                  <span>Account</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarTrigger icon={<ListMusic />}/>
    </>
  )
}
