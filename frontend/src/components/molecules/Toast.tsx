import { Check, X } from "lucide-react"

import Button from "../atoms/Button"

type ToastProps = {
  message: string
  isVisible: boolean
  onClose: () => void
}

const Toast = ({
  message,
  isVisible,
  onClose,
}: ToastProps) => {
  return (
    <div
      className={`
        fixed
        right-6
        bottom-6
        z-[100]
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-line
        bg-paper
        px-4
        py-3
        shadow-[0_8px_30px_rgba(0,0,0,0.15)]
        transition-all
        duration-300

        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 pointer-events-none opacity-0"
        }
      `}
    >
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-gold/20
          text-gold
        "
      >
        <Check
          size={17}
          strokeWidth={2}
        />
      </div>

      <p
        className="
          font-body
          text-sm
          font-medium
          text-ink
        "
      >
        {message}
      </p>

      <Button
        variant="ghost"
        onClick={onClose}
        aria-label="Close notification"
        className="
          ml-2
          h-8
          w-8
          !rounded-lg
          !p-0
        "
      >
        <X
          size={16}
          strokeWidth={1.8}
        />
      </Button>
    </div>
  )
}

export default Toast