import { Outlet } from "react-router-dom"

import AppHeader from "../components/organisms/AppHeader"

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout