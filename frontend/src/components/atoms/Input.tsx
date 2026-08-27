type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`
        w-full
        border-b
        border-line
        bg-transparent
        px-1
        py-3
        font-body
        text-ink
        outline-none
        placeholder:text-ink-muted
        focus:border-gold
        ${className}
      `}
      {...props}
    />
  )
}

export default Input