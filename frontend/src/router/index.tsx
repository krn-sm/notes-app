import { createBrowserRouter } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"

import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
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
        element: <AppLayout />,
        children: [
          {
            path: "/home",
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: "favorites",
                element: <HomePage />,
              },
              {
                path: "trash",
                element: <HomePage />,
              },
              {
                path: "category/:tagId",
                element: <HomePage />,
              },
            ],
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