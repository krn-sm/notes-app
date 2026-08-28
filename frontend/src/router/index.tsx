import { createBrowserRouter } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"
import AuthLayout from "../layouts/AuthLayout"
import DashboardLayout from "../layouts/DashboardLayout"

import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import NoteDetailPage from "../pages/NoteDetailPage"
import NotFoundPage from "../pages/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },

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

          // {
          //   path: "favorites",
          //   element: <FavoritesPage />,
          // },

          // {
          //   path: "trash",
          //   element: <TrashPage />,
          // },

          // {
          //   path: "category/:categoryName",
          //   element: <CategoryPage />,
          // },
        ],
      },

      {
        path: "note/:noteId",
        element: <NoteDetailPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
])

export default router