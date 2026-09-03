import { useState } from "react";

import {
  useBlocker,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";

import { useTags } from "../contexts/TagContext";
import { useToast } from "../contexts/ToastContext";

import AppHeader from "../components/organisms/AppHeader";
import ConfirmationModal from "../components/organisms/ConfirmationModal";
import NoteEditor from "../components/organisms/NoteEditor";
import NoteList from "../components/organisms/NoteList";

import type { User } from "../services/authService";
import type { Note } from "../services/noteService";

type OutletContext = {
  user: User | null;

  onProfileClick: () => void;

  isCreatingNote: boolean;

  setIsCreatingNote: (value: boolean) => void;

  isEditorOpen: boolean;

  setIsEditorOpen: (value: boolean) => void;

  isEditorDirty: boolean;

  setIsEditorDirty: (value: boolean) => void;

  newNoteKey: number;
};

const HomePage = () => {
  const {
    user,
    onProfileClick,
    isCreatingNote,
    setIsCreatingNote,
    setIsEditorOpen,
    isEditorDirty,
    setIsEditorDirty,
    newNoteKey,
  } = useOutletContext<OutletContext>();

  const { showToast } = useToast();

  const { tags } = useTags();

  const location = useLocation();

  const { tagId } = useParams();

  const [searchQuery, setSearchQuery] = useState("");

  const [noteCount, setNoteCount] = useState(0);

  const [notesRefreshKey, setNotesRefreshKey] = useState(0);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const activeNote = isCreatingNote ? null : selectedNote;

  const isEditorVisible = activeNote !== null || isCreatingNote;

  const blocker = useBlocker(isEditorVisible && isEditorDirty);

  const handleNoteUpdated = (updatedNote: Note) => {
    setSelectedNote(updatedNote);

    setIsEditorDirty(false);

    setNotesRefreshKey((current) => current + 1);
  };

  const handleNoteDeleted = () => {
    setSelectedNote(null);

    setIsCreatingNote(false);

    setIsEditorOpen(false);

    setIsEditorDirty(false);

    setNoteCount((current) => Math.max(0, current - 1));

    setNotesRefreshKey((current) => current + 1);
  };

  const handleNoteClick = (note: Note) => {
    if (note.is_deleted) {
      showToast(
        "This note is in Trash. Restore it to continue editing.",
        "warning",
      );

      return;
    }

    setSelectedNote(note);

    setIsCreatingNote(false);

    setIsEditorOpen(true);

    setIsEditorDirty(false);
  };

  const currentTag = tags.find((tag) => tag.id === Number(tagId));

  const getPageDetails = () => {
    const path = location.pathname;

    if (path === "/home/favorites") {
      return {
        title: "Favorites",

        description: "Notes you've marked as favorites.",

        filters: {
          favorite: true,
        },
      };
    }

    if (path === "/home/trash") {
      return {
        title: "Trash",

        description: "Notes you've moved to trash.",

        filters: {
          deleted: true,
        },
      };
    }

    if (tagId) {
      return {
        title: currentTag?.name ?? "Tags",

        description: currentTag
          ? `Notes with the ${currentTag.name} tag.`
          : "Notes with this tag.",

        filters: {
          tag_id: Number(tagId),
        },
      };
    }

    return {
      title: "All Notes",

      description: "Your thoughts, ideas, and memories.",

      filters: {},
    };
  };

  const { title, description, filters } = getPageDetails();

  const handleCloseEditor = () => {
    setSelectedNote(null);

    setIsCreatingNote(false);

    setIsEditorOpen(false);

    setIsEditorDirty(false);
  };

  const handleDiscardNavigation = () => {
    setIsEditorDirty(false);

    blocker.proceed?.();
  };

  const handleCancelNavigation = () => {
    blocker.reset?.();
  };

  return (
    <>
      <div
        className="
          flex
          h-full
          min-h-0
          flex-col
          bg-paper
        "
      >
        {/* App Header */}

        <AppHeader
          user={user}
          noteCount={noteCount}
          onProfileClick={onProfileClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Content */}

        <section
          className="
            min-h-0
            flex-1
            overflow-y-auto
            p-5

            sm:p-6

            md:p-8
          "
        >
          <div
            className="
              flex
              min-h-full
              gap-6
            "
          >
            {/* Notes Area */}

            <div
              className={`
                flex
                min-h-0
                flex-col
                transition-all
                duration-300

                ${
                  isEditorVisible
                    ? `
                      hidden

                      md:flex
                      md:w-72
                      md:shrink-0
                    `
                    : "w-full"
                }
              `}
            >
              {/* Page Heading */}

              <div
                className="
                  mb-6
                  shrink-0
                "
              >
                <h1
                  className="
                    font-display
                    text-3xl
                    text-ink

                    md:text-4xl
                  "
                >
                  {title}
                </h1>

                <p
                  className="
                    mt-1
                    font-body
                    text-sm
                    text-ink-muted
                  "
                >
                  {description}
                </p>
              </div>

              {/* Note List */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-hidden
                "
              >
                <NoteList
                  key={`${location.pathname}-${notesRefreshKey}`}
                  variant={isEditorVisible ? "sidebar" : "grid"}
                  selectedNoteId={activeNote?.id ?? null}
                  onNoteClick={handleNoteClick}
                  filters={filters}
                  searchQuery={searchQuery}
                  onNoteCountChange={setNoteCount}
                />
              </div>
            </div>

            {/* Editor */}

            {isEditorVisible && (
              <div
                className="
                  fixed
                  inset-0
                  z-40
                  min-h-0
                  bg-paper
                  animate-in
                  fade-in
                  slide-in-from-right-4
                  duration-300

                  md:static
                  md:z-auto
                  md:min-w-0
                  md:flex-1
                  md:bg-transparent
                "
              >
                <NoteEditor
                  key={
                    isCreatingNote ? `new-note-${newNoteKey}` : activeNote?.id
                  }
                  note={activeNote ?? undefined}
                  isNew={isCreatingNote}
                  onClose={handleCloseEditor}
                  onDirtyChange={setIsEditorDirty}
                  onNoteCreated={(createdNote) => {
                    setSelectedNote(createdNote);

                    setIsCreatingNote(false);

                    setIsEditorOpen(true);

                    setIsEditorDirty(false);

                    setNoteCount((current) => current + 1);

                    setNotesRefreshKey((current) => current + 1);
                  }}
                  onNoteUpdated={handleNoteUpdated}
                  onNoteDeleted={handleNoteDeleted}
                />
              </div>
            )}
          </div>
        </section>
      </div>

      <ConfirmationModal
        isOpen={blocker.state === "blocked"}
        title="Discard unsaved changes?"
        description="Your changes haven't been saved. They will be lost if you continue."
        cancelLabel="Keep Editing"
        confirmLabel="Discard Changes"
        onCancel={handleCancelNavigation}
        onConfirm={handleDiscardNavigation}
        danger
      />
    </>
  );
};

export default HomePage;
