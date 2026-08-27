import Input from "../atoms/Input"

type FormFieldProps = {
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const FormField = ({
  label,
  error,
  className = "",
  ...props
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="
          font-body
          text-sm
          font-medium
          text-ink
        "
      >
        {label}
      </label>

      <Input
        className={className}
        {...props}
      />

      {error && (
        <p
          className="
            font-body
            text-xs
            text-red-600
          "
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField