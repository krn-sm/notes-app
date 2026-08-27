import { Outlet } from "react-router-dom"

import SideBar from "../components/organisms/SideBar"

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-paper">
      <SideBar />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout