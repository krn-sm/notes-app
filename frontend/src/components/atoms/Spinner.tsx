type SpinnerProps = {
  className?: string
}

const Spinner = ({ className = "" }: SpinnerProps) => {
  return (
    <span
      className={`
        inline-block
        h-5
        w-5
        animate-spin
        rounded-full
        border-2
        border-stone-300
        border-t-amber-700
        ${className}
      `}
    />
  )
}

export default Spinner