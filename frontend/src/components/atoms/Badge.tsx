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
        border-stone-300
        bg-stone-100
        px-3
        py-1
        text-xs
        font-medium
        text-stone-600
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge