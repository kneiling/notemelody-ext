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
import { newMelody } from "~zodSchemas/Melody"

import type { RxCollection } from "rxdb"
import type { MelodyDocType } from "~rxdb/Schema"


export const AppSidebar: React.FC = () => {
  const {setOpen} = useSidebar()
  const navigate = useNavigate()
  const collection: RxCollection<MelodyDocType> | null = useRxCollection('melodies');

  console.dir(navigate)
  console.dir(collection)

  const addMelody = async (event) => {
    if (!collection) {
      console.error("No collection found. Cannot add melody.");
      return;
    }

    const mel = await collection?.insert(newMelody())
    debugger
    if (mel?.id) {
      navigate(mel.id);
    } else {
      console.error("Failed to navigate because melody ID is undefined.");
    }
  }

  const query = collection?.find();

  const {
    result: melodies,
    isFetching
  } = useRxQuery(query, {
    pageSize: 10,
    pagination: 'Infinite',
  });

  if (isFetching) {
    return 'Loading...';
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

              <SidebarMenuAction onClick={addMelody}>
                <Plus /> <span className="sr-only">Add Melody</span>
              </SidebarMenuAction>
            </SidebarGroupLabel>
            <SidebarGroupContent>
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
