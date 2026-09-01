import type { ReactNode } from "react"

import Button from "./Button"

type ToolbarButtonProps = {
  children: ReactNode
  onClick?: () => void
  isActive?: boolean
  ariaLabel: string
  className?: string
}

const ToolbarButton = ({
  children,
  onClick,
  isActive = false,
  ariaLabel,
  className = "",
}: ToolbarButtonProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      onMouseDown={(event) => {
        event.preventDefault()
      }}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        h-11
        w-11
        shrink-0
        p-0
        transition

        ${
          isActive
            ? "bg-paper-dark text-ink shadow-sm"
            : "text-ink-muted hover:bg-paper-dark hover:text-ink"
        }

        ${className}
      `}
    >
      {children}
    </Button>
  )
}

export default ToolbarButton