import { useState } from "react"

import {
  Bold,
  Check,
  CheckSquare,
  ChevronDown,
  Italic,
  List,
  ListOrdered,
  Tag as TagIcon,
  Type,
  Underline,
} from "lucide-react"

import ToolbarButton from "../atoms/ToolbarButton"

type EditorToolbarProps = {
  onBold: () => void
  onItalic: () => void
  onUnderline: () => void
  onBulletList: () => void
  onOrderedList: () => void
  onChecklist: () => void
  onFocusTags: () => void
  onCycleTextSize: () => void
  onSave: () => void

  isBold?: boolean
  isItalic?: boolean
  isUnderline?: boolean
  isBulletList?: boolean
  isOrderedList?: boolean

  isSaving?: boolean
}

const Divider = () => (
  <div
    className="
      mx-1.5
      h-6
      w-px
      shrink-0
      bg-line
    "
  />
)

const EditorToolbar = ({
  onBold,
  onItalic,
  onUnderline,
  onBulletList,
  onOrderedList,
  onChecklist,
  onFocusTags,
  onCycleTextSize,
  onSave,

  isBold = false,
  isItalic = false,
  isUnderline = false,
  isBulletList = false,
  isOrderedList = false,

  isSaving = false,
}: EditorToolbarProps) => {
  const [textSizeLabel, setTextSizeLabel] =
    useState<"S" | "M" | "L">("M")

  const handleTextSizeClick = () => {
    setTextSizeLabel((current) => {
      if (current === "S") return "M"
      if (current === "M") return "L"

      return "S"
    })

    onCycleTextSize()
  }

  return (
    <div
      className="
        flex
        w-full
        shrink-0
        items-center
        gap-1
      "
    >
      <ToolbarButton
        ariaLabel="Text size"
        onClick={handleTextSizeClick}
        className="
          !w-auto
          gap-1
          px-3
        "
      >
        <Type size={20} />

        <span className="text-xs font-semibold">
          {textSizeLabel}
        </span>

        <ChevronDown size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        ariaLabel="Bold"
        onClick={onBold}
        isActive={isBold}
      >
        <Bold size={21} />
      </ToolbarButton>

      <ToolbarButton
        ariaLabel="Italic"
        onClick={onItalic}
        isActive={isItalic}
      >
        <Italic size={21} />
      </ToolbarButton>

      <ToolbarButton
        ariaLabel="Underline"
        onClick={onUnderline}
        isActive={isUnderline}
      >
        <Underline size={21} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        ariaLabel="Bullet list"
        onClick={onBulletList}
        isActive={isBulletList}
      >
        <List size={21} />
      </ToolbarButton>

      <ToolbarButton
        ariaLabel="Numbered list"
        onClick={onOrderedList}
        isActive={isOrderedList}
      >
        <ListOrdered size={21} />
      </ToolbarButton>

      <ToolbarButton
        ariaLabel="Checklist"
        onClick={onChecklist}
      >
        <CheckSquare size={21} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        ariaLabel="Add tag"
        onClick={onFocusTags}
      >
        <TagIcon size={20} />
      </ToolbarButton>

      {/* Push save button to right */}
      <div className="ml-auto" />

      <ToolbarButton
        ariaLabel="Save note"
        onClick={onSave}
        className="
          !rounded-lg
          !bg-ink
          !text-paper
          hover:!bg-leather-light
        "
      >
        <Check
          size={22}
          strokeWidth={2.5}
        />
      </ToolbarButton>

      {isSaving && (
        <span
          className="
            mr-2
            text-xs
            text-ink-muted
          "
        >
          Saving...
        </span>
      )}
    </div>
  )
}

export default EditorToolbar