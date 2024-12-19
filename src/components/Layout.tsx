import React from "react"
import { Outlet, useLocation, useParams, useSearchParams } from "react-router"

import { SidebarProvider } from "~components/ui/sidebar"
import { AppSidebar } from "~components/AppSidebar"

export const Layout: React.FC = () => {
  const location = useLocation()
  const params = useParams()

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <div>
          <pre>{JSON.stringify(location, null, 2)}</pre>
          <pre>{JSON.stringify(params, null, 2)}</pre>
        </div>

        <Outlet />
      </main>
    </SidebarProvider>
  )
}
