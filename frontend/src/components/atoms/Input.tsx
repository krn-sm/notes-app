type InputProps =
  React.InputHTMLAttributes<HTMLInputElement>

const Input = ({
  className = "",
  ...props
}: InputProps) => {
  return (
    <input
      className={`
        w-full
        bg-transparent
        font-body
        text-ink
        outline-none
        placeholder:text-ink-muted
        focus-visible:ring-gold/50
        focus-visible:ring-2
        
        disabled:cursor-not-allowed
        disabled:text-ink-muted
        disabled:opacity-60

        ${className}
      `}
      {...props}
    />
  )
}

export default Input