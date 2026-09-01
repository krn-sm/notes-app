import { forwardRef } from "react"

type TagInputProps = {
  value: string
  onChange: (value: string) => void
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void
}

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onChange, onKeyDown }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        onKeyDown={onKeyDown}
        placeholder="Add tag..."
        className="
          min-w-0
          flex-1
          bg-transparent
          font-body
          text-sm
          text-ink
          outline-none
          placeholder:text-ink-muted
        "
      />
    )
  },
)

TagInput.displayName = "TagInput"

export default TagInput