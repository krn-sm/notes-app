type ButtonProps = {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary"
  className?: string
}

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const variants = {
    primary: `
      bg-paper
      text-ink
      hover:bg-paper-dark
    `,
    secondary: `
      bg-leather-light
      text-paper
      hover:bg-[#3b2a20]
    `,
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        font-medium
        transition-all
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button