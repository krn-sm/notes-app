import { Outlet } from "react-router-dom"

import NavBar from "../components/organisms/NavBar"
import SideBar from "../components/organisms/SideBar"

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#f6f0e4]">
        <SideBar />

        <main className="flex min-w-0 flex-1 flex-col">
            <NavBar />

            <div className="flex-1">
            <Outlet />
            </div>
        </main>
        </div>        
    )
}

export default MainLayout