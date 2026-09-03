import Input from "../atoms/Input";

type FormFieldProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormField = ({
  label,
  error,
  id,
  className = "",
  ...props
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="
          font-body
          text-sm
          font-medium
          text-ink
        "
      >
        {label}
      </label>

      <Input id={id} className={className} {...props} />

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
  );
};

export default FormField;
