import React from "react"
import { NavLink, useNavigate } from "react-router"
import {Storage} from "@plasmohq/storage"

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
import { newMelody } from "~models/Melody"


export const AppSidebar: React.FC = () => {
  const {setOpen} = useSidebar()

  const storage = new Storage()

  const navigate = useNavigate()

  const addMelody = async () => {
    const mel = newMelody()
    await storage.set(mel.id, mel)
    navigate(mel.id)
  }

  const melodies = [
    { title: "Song 1", id: "song1", icon: Music2 },
    { title: "Song 2", id: "song2", icon: Music3 },
    { title: "Song 3", id: "song3", icon: Music4 },
  ]

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

              <SidebarMenuAction onClick={addMelody()}>
                <Plus /> <span className="sr-only">Add Melody</span>
              </SidebarMenuAction>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {melodies.map((melody) => (
                  <SidebarMenuItem key={melody.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={melody.id}>
                        <melody.icon />
                        <span>{melody.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
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
