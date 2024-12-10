import React from "react"
import { Outlet, useLocation, useParams, useSearchParams } from "react-router"

import { SidebarProvider } from "~components/ui/sidebar"
import { AppSidebar } from "~components/AppSidebar"

export const Layout: React.FC = () => {
  // const location = useLocation()
  // const params = useParams()
  // const searchParams = useSearchParams()
  //
  // console.log({location, params, searchParams});

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
