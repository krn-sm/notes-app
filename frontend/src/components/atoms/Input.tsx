type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className = "", ...props }: InputProps) => {
    return (
        <input
        className={`
        w-full
        border-b
        border-stone-400
        bg-transparent
        px-1
        py-3
        text-stone-800
        outline-none
        placeholder:text-stone-400
        focus:border-amber-700
        ${className}
        `}
      {...props}
    />
    )
}
export default Input