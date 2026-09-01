import { X } from "lucide-react"

import Badge from "../atoms/Badge"
import TagInput from "../atoms/TagInput"

type Tag = {
  id: number
  name: string
}

type EditorTagsProps = {
  tags: Tag[]
  value: string
  onChange: (value: string) => void
  onAdd: () => void
  onRemove: (tagId: number) => void
  inputRef?: React.Ref<HTMLInputElement>
}

const EditorTags = ({
  tags,
  value,
  onChange,
  onAdd,
  onRemove,
  inputRef,
}: EditorTagsProps) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      event.key === "Enter" &&
      value.trim()
    ) {
      event.preventDefault()
      onAdd()
    }
  }

  return (
    <div
      className="
        flex
        items-center
        gap-2
        border-t
        border-line
        pt-4
      "
    >
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          className="
            gap-1
            pr-2
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-[#73c7a5]
            "
          />

          <span>{tag.name}</span>

          <button
            type="button"
            onClick={() => onRemove(tag.id)}
            className="
              ml-1
              rounded
              text-ink-muted
              transition
              hover:text-ink
            "
            aria-label={`Remove ${tag.name}`}
          >
            <X size={14} />
          </button>
        </Badge>
      ))}

      <TagInput
        ref={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default EditorTags