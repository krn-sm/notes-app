import {
  Bold,
  Check,
  Clipboard,
  Italic,
  List,
  ListOrdered,
  Redo2,
  Trash2,
  Underline,
  Undo2,
} from "lucide-react";

import type { EditorFormatState } from "./EditorContent";

import ToolbarButton from "../atoms/ToolbarButton";

type EditorToolbarProps = {
  isEditing: boolean;
  isSaving?: boolean;
  isCopied?: boolean;

  formatState: EditorFormatState;

  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;

  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onBulletList: () => void;
  onOrderedList: () => void;

  onCopy: () => void;
  onDelete: () => void;
};

const EditorToolbar = ({
  isEditing,
  isSaving = false,
  isCopied = false,
  formatState,
  onSave,
  onUndo,
  onRedo,
  onBold,
  onItalic,
  onUnderline,
  onBulletList,
  onOrderedList,
  onCopy,
  onDelete,
}: EditorToolbarProps) => {
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
          <ToolbarButton ariaLabel="Undo" onClick={onUndo}>
            <Undo2 size={22} />
          </ToolbarButton>

          <ToolbarButton ariaLabel="Redo" onClick={onRedo}>
            <Redo2 size={22} />
          </ToolbarButton>

          <div
            className="
              mx-1
              h-7
              w-px
              bg-line
            "
          />

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

          <div
            className="
              mx-1
              h-7
              w-px
              bg-line
            "
          />

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

          <div
            className="
              mx-1
              h-7
              w-px
              bg-line
            "
          />

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
      ) : (
        <>
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
