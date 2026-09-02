import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import "./index.css"
import router from "./router"
import { AuthProvider } from "./contexts/AuthContext";
import { TagProvider } from "./contexts/TagContext";
import { ToastProvider } from "./contexts/ToastContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <AuthProvider>
    <TagProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </TagProvider>
  </AuthProvider>,
);