import { createBrowserRouter } from "react-router-dom"

import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import NotesPage from "../pages/NotesPage"
import NotFoundPage from "../pages/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <NotesPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

export default router