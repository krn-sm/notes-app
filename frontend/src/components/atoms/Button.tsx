type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
}

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    primary: `
      bg-gradient-to-b
      from-[#f6dfae]
      to-[#e8bd75]
      text-[#2a1d16]
      shadow-[0_3px_10px_rgba(0,0,0,0.28)]
      hover:brightness-105
      hover:-translate-y-[1px]
      hover:shadow-[0_5px_14px_rgba(0,0,0,0.35)]
    `,

    secondary: `
      bg-[#453127]
      text-paper
      hover:bg-[#523c30]
    `,

    ghost: `
      bg-transparent
      text-ink-muted
      hover:bg-paper-dark
      hover:text-ink
    `,
  }

  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-lg
        px-4
        py-2
        font-body
        font-medium
        transition-all
        duration-200
        active:scale-[0.99]
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button