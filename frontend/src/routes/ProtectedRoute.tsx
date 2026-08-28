import {
  Navigate,
  Outlet,
} from "react-router-dom"
import { useEffect, useState } from "react"

import Spinner from "../components/atoms/Spinner"
import { getCurrentUser } from "../services/authService"

const ProtectedRoute = () => {
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await getCurrentUser()

        setIsAuthenticated(true)
      } catch {
        setIsAuthenticated(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkAuthentication()
  }, [])

  if (isChecking) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-paper
        "
      >
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute