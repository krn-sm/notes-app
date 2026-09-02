import {
  Navigate,
  Outlet,
} from "react-router-dom"

import Spinner from "../components/atoms/Spinner"

import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = () => {
  const {
    user,
    isLoading,
  } = useAuth()

  if (isLoading) {
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

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute