import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-paper">
      <Outlet />
    </main>
  )
}

export default AuthLayout