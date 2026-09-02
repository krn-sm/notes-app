import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

import Toast from "../components/molecules/Toast"

type ToastType =
  | "success"
  | "error"
  | "warning"

type ToastContextType = {
  showToast: (
    message: string,
    type?: ToastType,
  ) => void
}

const ToastContext =
  createContext<ToastContextType | undefined>(
    undefined,
  )

type ToastProviderProps = {
  children: ReactNode
}

export const ToastProvider = ({
  children,
}: ToastProviderProps) => {
  const [message, setMessage] =
    useState("")

  const [type, setType] =
    useState<ToastType>("success")

  const showToast = (
    message: string,
    type: ToastType = "success",
  ) => {
    setMessage(message)

    setType(type)

    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  const handleClose = () => {
    setMessage("")
  }

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      {children}

      <Toast
        message={message}
        variant={type}
        isVisible={Boolean(message)}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context =
    useContext(ToastContext)

  if (!context) {
    throw new Error(
      "useToast must be used within ToastProvider",
    )
  }

  return context
}