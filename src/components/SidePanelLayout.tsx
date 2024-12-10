import React from "react"
import { Outlet, useLocation, useParams, useSearchParams } from "react-router"

import SidePanelMenu from "~components/SidePanelMenu"

const SidePanelLayout: React.FC = () => {

  let location = useLocation();
  let urlParams = useParams();
  let [urlSearchParams] = useSearchParams();

  console.log({location, urlParams, urlSearchParams});

  return (
    <div>
      <SidePanelMenu />

      <Outlet />
    </div>
  )
}

export default SidePanelLayout