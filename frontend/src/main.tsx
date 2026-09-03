import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import "./index.css"

import router from "./router"

import { ToastProvider } from "./contexts/ToastContext"

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <ToastProvider>
    <RouterProvider router={router} />
  </ToastProvider>,
)