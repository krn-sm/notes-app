import { X } from "lucide-react";

import Badge from "../atoms/Badge";
import TagInput from "../atoms/TagInput";

type Tag = {
  id: number;
  name: string;
};

type EditorTagsProps = {
  tags: Tag[];
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (tagId: number) => void;
  inputRef?: React.Ref<HTMLInputElement>;
};

const EditorTags = ({
  tags,
  value,
  onChange,
  onAdd,
  onRemove,
  inputRef,
}: EditorTagsProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value.trim()) {
      event.preventDefault();
      onAdd();
    }
  };

  return (
    <div
      className="
        flex
        min-w-0
        items-center
        gap-2
        overflow-x-auto
        border-t
        border-line
        pt-2
      "
    >
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          className="
            shrink-0
            gap-2
            pr-2
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-gold
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

      <div
        className="
          min-w-[120px]
          shrink-0
          sm:min-w-[140px]
        "
      >
        <TagInput
          ref={inputRef}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default EditorTags;
