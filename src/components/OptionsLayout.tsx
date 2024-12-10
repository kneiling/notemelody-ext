import React from "react"
import { Link, Outlet, useLocation, useParams, useSearchParams } from "react-router"
import { OptionsMenu } from "~components/Account"
import { Icon_bars } from "~components/icons"

import { SidebarProvider, SidebarTrigger } from "~components/ui/sidebar"
import { AppSidebar } from "~components/AppSidebar"

const OptionsLayout: React.FC = () => {
  let location = useLocation();
  let urlParams = useParams();
  let [urlSearchParams] = useSearchParams();

  console.log({location, urlParams, urlSearchParams});

  return (
    <>
      <h1>NoteMelody App UI Options</h1>

      <SidebarProvider>
        <AppSidebar />
          <main>
            <SidebarTrigger />

            <Outlet />
          </main>
      </SidebarProvider>

      <div className="flex">

        <div className="drawer md:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle drawer-button md:hidden">
              <Icon_bars />
            </label>

            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
              {/* Sidebar content here */}
              {/*<OptionsMenu />*/}
              <li><Link to={"account"}>Account</Link></li>
              <li><Link to={"theme"}>Theme</Link></li>
            </ul>
          </div>
        </div>
      </div>

    </>
  )
}

export default OptionsLayout