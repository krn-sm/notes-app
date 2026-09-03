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

import { useEffect, useRef, useState } from "react";

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

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  const toolbarRef = useRef<HTMLDivElement>(null);

  const tagButtonRef = useRef<HTMLDivElement>(null);

  const availableTags = tags.filter(
    (tag) => !selectedTags.some((selectedTag) => selectedTag.id === tag.id),
  );

  /*
   * Start the mobile toolbar
   * at the right-most position.
   */

  useEffect(() => {
    const toolbar = toolbarRef.current;

    if (!toolbar) {
      return;
    }

    const scrollToEnd = () => {
      toolbar.scrollLeft = toolbar.scrollWidth;
    };

    scrollToEnd();

    window.addEventListener("resize", scrollToEnd);

    return () => {
      window.removeEventListener("resize", scrollToEnd);
    };
  }, []);

  const handleTagClick = () => {
    if (!isTagDropdownOpen && tagButtonRef.current) {
      const rect = tagButtonRef.current.getBoundingClientRect();

      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }

    setIsTagDropdownOpen((current) => !current);
  };

  return (
    <>
      {/* Toolbar */}

      <div
        ref={toolbarRef}
        className="
          flex
          w-full
          items-center
          justify-end
          gap-2
          overflow-x-auto
          py-1

          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
        {isEditing ? (
          <>
            {/* Undo / Redo */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >
              <ToolbarButton ariaLabel="Undo" onClick={onUndo}>
                <Undo2 size={22} />
              </ToolbarButton>

              <ToolbarButton ariaLabel="Redo" onClick={onRedo}>
                <Redo2 size={22} />
              </ToolbarButton>
            </div>

            <div
              className="
                mx-1
                h-7
                w-px
                shrink-0
                bg-line
              "
            />

            {/* Text Formatting */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >
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
            </div>

            <div
              className="
                mx-1
                h-7
                w-px
                shrink-0
                bg-line
              "
            />

            {/* Lists */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >
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
            </div>

            <div
              className="
                mx-1
                h-7
                w-px
                shrink-0
                bg-line
              "
            />
          </>
        ) : (
          <>
            {/* Copy */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >
              {isCopied && (
                <span
                  className="
                    shrink-0
                    font-body
                    text-sm
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

            <div
              className="
                mx-1
                h-7
                w-px
                shrink-0
                bg-line
              "
            />
          </>
        )}

        {/* Tag Button */}

        <div ref={tagButtonRef} className="shrink-0">
          <ToolbarButton
            ariaLabel="Manage tags"
            onClick={handleTagClick}
            isActive={isTagDropdownOpen}
          >
            <TagIcon size={22} />
          </ToolbarButton>
        </div>

        {/* Save */}

        {isEditing && (
          <>
            <div
              className="
                mx-1
                h-7
                w-px
                shrink-0
                bg-line
              "
            />

            <ToolbarButton
              ariaLabel="Save note"
              onClick={onSave}
              className="
                shrink-0
                !rounded-lg
                !bg-ink
                !text-paper
                hover:!bg-leather-light
              "
            >
              {isSaving ? (
                <span
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-paper/40
                    border-t-paper
                  "
                />
              ) : (
                <Check size={23} strokeWidth={2.5} />
              )}
            </ToolbarButton>
          </>
        )}

        {/* Delete */}

        {!isEditing && (
          <>
            <div
              className="
                mx-1
                h-7
                w-px
                shrink-0
                bg-line
              "
            />

            <ToolbarButton
              ariaLabel="Delete note"
              onClick={onDelete}
              className="
                shrink-0
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
              shrink-0
              text-sm
              text-ink-muted
            "
          >
            Saving...
          </span>
        )}
      </div>

      {/* Floating Tag Dropdown */}

      {isTagDropdownOpen && (
        <div
          className="
            fixed
            z-[9999]
            w-52
            max-h-[280px]
            overflow-y-auto
            rounded-xl
            border
            border-line
            bg-paper
            py-2
            shadow-lg
          "
          style={{
            top: dropdownPosition.top,
            right: dropdownPosition.right,
          }}
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

                <span className="truncate">{tag.name}</span>
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
    </>
  );
};

export default EditorToolbar;
