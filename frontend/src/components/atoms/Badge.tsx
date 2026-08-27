type BadgeProps = {
  children: React.ReactNode
  className?: string
}

const Badge = ({ children, className = "" }: BadgeProps) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        border-line
        bg-paper-dark
        px-3
        py-1
        text-xs
        font-medium
        text-ink-muted
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge