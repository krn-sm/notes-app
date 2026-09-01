import { ArrowLeft, CalendarDays } from "lucide-react";
import { useRef, useState } from "react";

import Button from "../atoms/Button";
import EditorTitle from "../atoms/EditorTitle";

import EditorContent, {
  type EditorContentHandle,
  type EditorFormatState,
} from "../molecules/EditorContent";
import EditorFooter from "../molecules/EditorFooter";
import EditorTags from "../molecules/EditorTags";
import EditorToolbar from "../molecules/EditorToolbar";

import { updateNote, type Note } from "../../services/noteService";

type Tag = {
  id: number;
  name: string;
};

type TextSize = "S" | "M" | "L";

type NoteEditorProps = {
  note: Note;
  onClose: () => void;
};

const NoteEditor = ({ note, onClose }: NoteEditorProps) => {
  const [title, setTitle] = useState(note.title);

  const [content, setContent] = useState(note.content);

  const [tags, setTags] = useState<Tag[]>(
    note.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
  );

  const [tagInput, setTagInput] = useState("");

  const [textSize, setTextSize] = useState<TextSize>("M");

  const [formatState, setFormatState] = useState<EditorFormatState>({
    bold: false,
    italic: false,
    underline: false,
    bulletList: false,
    orderedList: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const editorRef = useRef<EditorContentHandle>(null);

  const formattedDate = new Date(note.updated_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag) {
      return;
    }

    const tagAlreadyExists = tags.some(
      (tag) => tag.name.toLowerCase() === trimmedTag.toLowerCase(),
    );

    if (tagAlreadyExists) {
      setTagInput("");
      return;
    }

    setTags((currentTags) => [
      ...currentTags,
      {
        id: Date.now(),
        name: trimmedTag,
      },
    ]);

    setTagInput("");
  };

  const handleRemoveTag = (tagId: number) => {
    setTags((currentTags) => currentTags.filter((tag) => tag.id !== tagId));
  };

  const handleFocusTags = () => {
    const tagInputElement =
      document.querySelector<HTMLInputElement>("[data-tag-input]");

    tagInputElement?.focus();
  };

  const handleCycleTextSize = () => {
    setTextSize((current) => {
      if (current === "S") {
        return "M";
      }

      if (current === "M") {
        return "L";
      }

      return "S";
    });
  };

  const textSizeClassName = {
    S: "text-sm",
    M: "text-lg",
    L: "text-xl",
  }[textSize];

  const handleSave = async () => {
    try {
      setIsSaving(true);

      await updateNote(note.id, {
        title,
        content,
        tag_ids: tags
          .filter((tag) => tag.id < 1000000000000)
          .map((tag) => tag.id),
      });
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section
      className="
        flex
        min-h-full
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-line
        bg-paper
        shadow-lg
      "
    >
      {/* Toolbar */}

      <header
        className="
          flex
          min-h-[64px]
          items-center
          border-b
          border-line
          px-6
        "
      >
        <div
          className="
            flex
            w-full
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <Button
              variant="ghost"
              onClick={onClose}
              className="
                h-10
                w-10
                !p-0
              "
              aria-label="Close editor"
            >
              <ArrowLeft size={20} />
            </Button>

            <div
              className="
                h-6
                w-px
                bg-line
              "
            />

            <EditorToolbar
              onBold={() => editorRef.current?.format("bold")}
              onItalic={() => editorRef.current?.format("italic")}
              onUnderline={() => editorRef.current?.format("underline")}
              onBulletList={() =>
                editorRef.current?.format("insertUnorderedList")
              }
              onOrderedList={() =>
                editorRef.current?.format("insertOrderedList")
              }
              onChecklist={() => editorRef.current?.format("checklist")}
              onFocusTags={handleFocusTags}
              onCycleTextSize={handleCycleTextSize}
              onSave={handleSave}
              isBold={formatState.bold}
              isItalic={formatState.italic}
              isUnderline={formatState.underline}
              isBulletList={formatState.bulletList}
              isOrderedList={formatState.orderedList}
              isSaving={isSaving}
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={handleSave}
            disabled={isSaving}
            className="
              h-10
              w-10
              !p-0
              text-accent
              hover:!bg-paper-dark
            "
            aria-label="Save note"
          >
            {isSaving ? "..." : "✓"}
          </Button>
        </div>
      </header>

      {/* Editor */}

      <div
        className="
          flex
          flex-1
          flex-col
          px-10
          py-8
        "
      >
        {/* Title + Date */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-6
            border-b
            border-line
            pb-6
          "
        >
          <div className="min-w-0 flex-1">
            <EditorTitle value={title} onChange={setTitle} />
          </div>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              pt-2
              font-body
              text-sm
              text-ink-muted
            "
          >
            <CalendarDays size={16} />

            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Writing Area */}

        <div
          className="
            flex-1
            py-8
          "
        >
          <EditorContent
            ref={editorRef}
            value={content}
            onChange={setContent}
            textSizeClassName={textSizeClassName}
            onFormatStateChange={setFormatState}
          />
        </div>

        {/* Tags */}

        <div
          className="
            border-t
            border-line
            pt-4
          "
        >
          <EditorTags
            tags={tags}
            value={tagInput}
            onChange={setTagInput}
            onAdd={handleAddTag}
            onRemove={handleRemoveTag}
          />
        </div>

        {/* Footer */}

        <EditorFooter content={content} />
      </div>
    </section>
  );
};

export default NoteEditor;
