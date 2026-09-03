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

import ConfirmationModal from "./ConfirmationModal";

import { createTag } from "../../services/tagService";

import {
  createNote,
  deleteNote,
  updateNote,
  type Note,
} from "../../services/noteService";

import { useTags } from "../../contexts/TagContext";
import { useToast } from "../../contexts/ToastContext";

type Tag = {
  id: number;
  name: string;
};

type NoteEditorProps = {
  note?: Note;

  isNew?: boolean;

  onClose: () => void;

  onDirtyChange?: (isDirty: boolean) => void;

  onNoteCreated?: (note: Note) => void;

  onNoteUpdated?: (note: Note) => void;

  onNoteDeleted?: (noteId: number) => void;
};

const NoteEditor = ({
  note,
  isNew = false,
  onClose,
  onDirtyChange,
  onNoteCreated,
  onNoteUpdated,
  onNoteDeleted,
}: NoteEditorProps) => {
  const { showToast } = useToast();

  const { tags: allTags, refreshTags } = useTags();

  const [title, setTitle] = useState(note?.title ?? "");

  const [content, setContent] = useState(note?.content ?? "");

  const [tags, setTags] = useState<Tag[]>(
    note?.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })) ?? [],
  );

  const [isDirty, setIsDirty] = useState(isNew);

  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const markAsDirty = () => {
    if (!isDirty) {
      setIsDirty(true);

      onDirtyChange?.(true);
    }
  };

  const markAsClean = () => {
    setIsDirty(false);

    onDirtyChange?.(false);
  };
  const [tagInput, setTagInput] = useState("");

  const [isEditing, setIsEditing] = useState(isNew);

  const [isSaving, setIsSaving] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [isCopied, setIsCopied] = useState(false);

  const [formatState, setFormatState] = useState<EditorFormatState>({
    bold: false,
    italic: false,
    underline: false,
    bulletList: false,
    orderedList: false,
  });

  const editorRef = useRef<EditorContentHandle>(null);

  const formattedDate = note
    ? new Date(note.updated_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "New note";

  const handleTitleChange = (value: string) => {
    setTitle(value);

    setIsEditing(true);

    markAsDirty();
  };

  const handleContentChange = (value: string) => {
    setContent(value);

    setIsEditing(true);

    markAsDirty();
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag) {
      return;
    }

    const selectedTag = tags.find(
      (tag) => tag.name.toLowerCase() === trimmedTag.toLowerCase(),
    );

    if (selectedTag) {
      setTagInput("");

      return;
    }

    /*
     * Check whether this tag already exists
     * globally.
     */

    const existingTag = allTags.find(
      (tag) => tag.name.toLowerCase() === trimmedTag.toLowerCase(),
    );

    if (existingTag) {
      setTags((currentTags) => [
        ...currentTags,
        {
          id: existingTag.id,
          name: existingTag.name,
        },
      ]);

      setTagInput("");

      setIsEditing(true);
      markAsDirty();
      return;
    }

    /*
     * New tag.
     *
     * Don't create it in the backend yet.
     * Give it a temporary negative ID.
     */

    const temporaryTag: Tag = {
      id: -Date.now(),

      name: trimmedTag,
    };

    setTags((currentTags) => [...currentTags, temporaryTag]);

    setTagInput("");

    setIsEditing(true);
    markAsDirty();
  };

  const handleSelectTag = (tag: Tag) => {
    const alreadySelected = tags.some((currentTag) => currentTag.id === tag.id);

    if (alreadySelected) {
      return;
    }

    setTags((currentTags) => [...currentTags, tag]);

    setIsEditing(true);
    markAsDirty();
  };

  const handleRemoveTag = (tagId: number) => {
    setTags((currentTags) => currentTags.filter((tag) => tag.id !== tagId));

    setIsEditing(true);
    markAsDirty();
  };

  /*
   * Creates any temporary tags
   * and returns tags with real IDs.
   */

  const resolveTagsBeforeSave = async (): Promise<Tag[]> => {
    const resolvedTags: Tag[] = [];

    for (const tag of tags) {
      /*
       * Real tag.
       */

      if (tag.id > 0) {
        resolvedTags.push(tag);

        continue;
      }

      /*
       * Temporary tag.
       *
       * Create it only now.
       */

      const createdTag = await createTag({
        name: tag.name,
      });

      resolvedTags.push(createdTag);
    }

    return resolvedTags;
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);


      const resolvedTags = await resolveTagsBeforeSave();

      const tagIds = resolvedTags.map((tag) => tag.id);

      if (isNew) {
        const createdNote = await createNote({
          title: title.trim() || "Untitled Note",

          content,

          tag_ids: tagIds,
        });

        setTags(resolvedTags);

        await refreshTags();

        onNoteCreated?.(createdNote);

        setIsEditing(false);

        markAsClean();

        return;
      }

      if (!note) {
        return;
      }

      const updatedNote = await updateNote(note.id, {
        title,
        content,

        tag_ids: tagIds,
      });

      setTags(resolvedTags);

      await refreshTags();

      onNoteUpdated?.(updatedNote);

      setIsEditing(false);

      markAsClean();
    } catch (error) {
      console.error("Failed to save note:", error);

      showToast(
        error instanceof Error ? error.message : "Failed to save note",
        "error",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleUndo = () => {
    editorRef.current?.focus();

    document.execCommand("undo");
  };

  const handleRedo = () => {
    editorRef.current?.focus();

    document.execCommand("redo");
  };

  const handleFormat = (command: string) => {
    editorRef.current?.format(command);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${content}`);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy note:", error);

      showToast("Failed to copy note", "error");
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!note) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteNote(note.id);

      await refreshTags();

      setIsDeleteModalOpen(false);

      onNoteDeleted?.(note.id);

      onClose();

      showToast("Note moved to trash", "success");
    } catch (error) {
      console.error("Failed to delete note:", error);

      showToast(
        error instanceof Error ? error.message : "Failed to delete note",
        "error",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <section
        className="
          flex
          h-full
          min-h-0
          w-full
          flex-col
          overflow-hidden
          bg-paper

          md:rounded-xl
          md:border
          md:border-line
          md:shadow-lg
        "
      >
        {/* Toolbar */}

        <header
          className="
            flex
            min-h-[64px]
            shrink-0
            items-center
            border-b
            border-line
            px-2

            sm:px-3

            md:min-h-[72px]
            md:px-6
          "
        >
          <Button
            variant="ghost"
            onClick={() => {
              if (isDirty) {
                setIsDiscardModalOpen(true);

                return;
              }

              onClose();
            }}
            className="
              h-11
              w-11
              shrink-0
              !p-0

              sm:h-12
              sm:w-12
            "
            aria-label="Close editor"
          >
            <ArrowLeft size={21} />
          </Button>

          <div
            className="
              mx-2
              h-7
              w-px
              shrink-0
              bg-line

              sm:mx-4
            "
          />

          <div
            className="
              min-w-0
              flex-1
              overflow-hidden
            "
          >
            <EditorToolbar
              isEditing={isEditing}
              isSaving={isSaving}
              isCopied={isCopied}
              formatState={formatState}
              selectedTags={tags}
              tags={allTags}
              onSave={handleSave}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onBold={() => handleFormat("bold")}
              onItalic={() => handleFormat("italic")}
              onUnderline={() => handleFormat("underline")}
              onBulletList={() => handleFormat("insertUnorderedList")}
              onOrderedList={() => handleFormat("insertOrderedList")}
              onSelectTag={handleSelectTag}
              onCopy={handleCopy}
              onDelete={handleDeleteClick}
            />
          </div>
        </header>

        {/* Editor */}

        <div
          className="
            flex
            min-h-0
            flex-1
            flex-col
            px-5
            py-5

            sm:px-6
            sm:py-6

            md:px-10
            md:py-8
          "
        >
          {/* Title + Date */}

          <div
            className="
              flex
              shrink-0
              flex-col
              gap-3
              border-b
              border-line
              pb-5

              sm:flex-row
              sm:items-start
              sm:justify-between
              sm:gap-6
              sm:pb-6
            "
          >
            <div
              className="
                min-w-0
                flex-1
              "
            >
              <EditorTitle value={title} onChange={handleTitleChange} />
            </div>

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
                font-body
                text-xs
                text-ink-muted

                sm:pt-2
                sm:text-sm
              "
            >
              <CalendarDays size={15} />

              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Writing Area */}

          <div
            className="
              min-h-0
              flex-1
              py-6

              md:py-8
            "
          >
            <EditorContent
              ref={editorRef}
              value={content}
              onChange={handleContentChange}
              onFormatChange={setFormatState}
            />
          </div>

          {/* Tags */}

          <div
            className="
              shrink-0
              border-t
              border-line
              pt-1
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

          <div className="shrink-0">
            <EditorFooter content={content} />
          </div>
        </div>
      </section>

      {/* Delete Confirmation */}

      {!isNew && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          title="Move note to trash?"
          description={`"${title}" will be moved to the trash.`}
          cancelLabel="Cancel"
          confirmLabel="Move to Trash"
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
          danger
        />
      )}
      {/* Discard Changes Confirmation */}

      <ConfirmationModal
        isOpen={isDiscardModalOpen}
        title="Discard unsaved changes?"
        description="Your changes haven't been saved. They will be lost if you close this note."
        cancelLabel="Keep Editing"
        confirmLabel="Discard Changes"
        onCancel={() => setIsDiscardModalOpen(false)}
        onConfirm={() => {
          setIsDiscardModalOpen(false);

          markAsClean();

          onClose();
        }}
        danger
      />
    </>
  );
};

export default NoteEditor;
