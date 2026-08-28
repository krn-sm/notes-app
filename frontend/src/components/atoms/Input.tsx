type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`
        w-full
        bg-transparent
        font-body
        text-ink
        outline-none
        placeholder:text-ink-muted
        ${className}
      `}
      {...props}
    />
  )
}

export default Input