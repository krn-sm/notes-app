import { createBrowserRouter } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"
import DashboardLayout from "../layouts/DashboardLayout"

import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import NoteDetailPage from "../pages/NoteDetailPage"
import NotFoundPage from "../pages/NotFoundPage"

import ProtectedRoute from "../routes/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <AppLayout />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
            ],
          },

          {
            path: "note/:noteId",
            element: <NoteDetailPage />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
])

export default router