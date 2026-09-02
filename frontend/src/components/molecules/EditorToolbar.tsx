import {
  Bold,
  Check,
  Clipboard,
  Italic,
  List,
  ListOrdered,
  Redo2,
  TagIcon,
  Trash2,
  Underline,
  Undo2,
} from "lucide-react";

import { useState } from "react";

import type { EditorFormatState } from "./EditorContent";

import ToolbarButton from "../atoms/ToolbarButton";

import type { Tag } from "../../services/tagService";

type EditorToolbarProps = {
  isEditing: boolean;

  isSaving?: boolean;

  isCopied?: boolean;

  formatState: EditorFormatState;

  tags: Tag[];

  selectedTags: Tag[];

  onSave: () => void;

  onUndo: () => void;

  onRedo: () => void;

  onBold: () => void;

  onItalic: () => void;

  onUnderline: () => void;

  onBulletList: () => void;

  onOrderedList: () => void;

  onSelectTag: (tag: Tag) => void;

  onCopy: () => void;

  onDelete: () => void;
};

const EditorToolbar = ({
  isEditing,

  isSaving = false,

  isCopied = false,

  formatState,

  tags,

  selectedTags,

  onSave,

  onUndo,

  onRedo,

  onBold,

  onItalic,

  onUnderline,

  onBulletList,

  onOrderedList,

  onSelectTag,

  onCopy,

  onDelete,
}: EditorToolbarProps) => {
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const availableTags = tags.filter(
    (tag) => !selectedTags.some((selectedTag) => selectedTag.id === tag.id),
  );

  return (
    <div
      className="
        ml-auto
        flex
        items-center
        gap-2
      "
    >
      {isEditing ? (
        <>
          {/* Undo / Redo */}

          <ToolbarButton ariaLabel="Undo" onClick={onUndo}>
            <Undo2 size={22} />
          </ToolbarButton>

          <ToolbarButton ariaLabel="Redo" onClick={onRedo}>
            <Redo2 size={22} />
          </ToolbarButton>

          <div className="mx-1 h-7 w-px bg-line" />

          {/* Text Formatting */}

          <ToolbarButton
            ariaLabel="Bold"
            onClick={onBold}
            isActive={formatState.bold}
          >
            <Bold size={22} />
          </ToolbarButton>

          <ToolbarButton
            ariaLabel="Italic"
            onClick={onItalic}
            isActive={formatState.italic}
          >
            <Italic size={22} />
          </ToolbarButton>

          <ToolbarButton
            ariaLabel="Underline"
            onClick={onUnderline}
            isActive={formatState.underline}
          >
            <Underline size={22} />
          </ToolbarButton>

          <div className="mx-1 h-7 w-px bg-line" />

          {/* Lists */}

          <ToolbarButton
            ariaLabel="Bullet list"
            onClick={onBulletList}
            isActive={formatState.bulletList}
          >
            <List size={22} />
          </ToolbarButton>

          <ToolbarButton
            ariaLabel="Numbered list"
            onClick={onOrderedList}
            isActive={formatState.orderedList}
          >
            <ListOrdered size={22} />
          </ToolbarButton>

          <div className="mx-1 h-7 w-px bg-line" />
        </>
      ) : (
        <>
          {/* Copy */}

          <div className="flex items-center gap-2">
            {isCopied && (
              <span
                className="
            text-sm
            font-body
            text-ink-muted
            animate-in
            fade-in
            duration-200
          "
              >
                Copied!
              </span>
            )}

            <ToolbarButton ariaLabel="Copy note" onClick={onCopy}>
              <Clipboard size={22} />
            </ToolbarButton>
          </div>

          <div className="mx-1 h-7 w-px bg-line" />
        </>
      )}

      {/* Tag Dropdown - ALWAYS VISIBLE */}

      <div className="relative">
        <ToolbarButton
          ariaLabel="Manage tags"
          onClick={() => setIsTagDropdownOpen((current) => !current)}
          isActive={isTagDropdownOpen}
        >
          <TagIcon size={22} />
        </ToolbarButton>

        {isTagDropdownOpen && (
          <div
            className="
        absolute
        right-0
        top-full
        z-50
        mt-2
        w-52
        overflow-hidden
        rounded-xl
        border
        border-line
        bg-paper
        py-2
        shadow-lg
      "
          >
            {availableTags.length > 0 ? (
              availableTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    onSelectTag(tag);

                    setIsTagDropdownOpen(false);
                  }}
                  className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-2.5
              text-left
              font-body
              text-sm
              text-ink
              transition-colors
              hover:bg-paper-dark
            "
                >
                  <TagIcon
                    size={16}
                    className="
                shrink-0
                text-gold
              "
                  />

                  <span>{tag.name}</span>
                </button>
              ))
            ) : (
              <p
                className="
            px-4
            py-3
            text-sm
            text-ink-muted
          "
              >
                No available tags
              </p>
            )}
          </div>
        )}
      </div>

      {/* Save only while editing */}

      {isEditing && (
        <>
          <div className="mx-1 h-7 w-px bg-line" />

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
            <Check size={23} strokeWidth={2.5} />
          </ToolbarButton>
        </>
      )}

      {/* Delete only when not editing */}

      {!isEditing && (
        <>
          <div className="mx-1 h-7 w-px bg-line" />

          <ToolbarButton
            ariaLabel="Delete note"
            onClick={onDelete}
            className="
        hover:!bg-red-50
        hover:!text-red-500
      "
          >
            <Trash2 size={22} />
          </ToolbarButton>
        </>
      )}

      {isSaving && (
        <span
          className="
            ml-2
            text-sm
            text-ink-muted
          "
        >
          Saving...
        </span>
      )}
    </div>
  );
};

export default EditorToolbar;
