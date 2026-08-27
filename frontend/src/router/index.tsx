import { createBrowserRouter } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"
import DashboardLayout from "../layouts/DashboardLayout"

import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import NoteDetailPage from "../pages/NoteDetailPage"
import NotFoundPage from "../pages/NotFoundPage"
import RegisterPage from "../pages/RegisterPage"

const router = createBrowserRouter([
  {
    path: "/",
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