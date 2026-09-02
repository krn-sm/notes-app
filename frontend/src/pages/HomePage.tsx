import { useState } from "react";

import { useLocation, useOutletContext, useParams } from "react-router-dom";

import { useTags } from "../contexts/TagContext";
import { useToast } from "../contexts/ToastContext";

import AppHeader from "../components/organisms/AppHeader";
import NoteEditor from "../components/organisms/NoteEditor";
import NoteList from "../components/organisms/NoteList";

import type { User } from "../services/authService";
import type { Note } from "../services/noteService";

type OutletContext = {
  user: User | null;

  onProfileClick: () => void;

  isCreatingNote: boolean;

  setIsCreatingNote: (
    value: boolean,
  ) => void;

  newNoteKey: number;
};

const HomePage = () => {
  const {
    user,
    onProfileClick,
    isCreatingNote,
    setIsCreatingNote,
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

  const isEditorOpen = activeNote !== null || isCreatingNote;

  const handleNoteUpdated = (updatedNote: Note) => {
    setSelectedNote(updatedNote);

    setNotesRefreshKey((current) => current + 1);
  };

  const handleNoteDeleted = () => {
    setSelectedNote(null);

    setIsCreatingNote(false);

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

  return (
    <div
      className="
        flex
        h-screen
        min-h-0
        flex-col
        overflow-hidden
      "
    >
      <AppHeader
        user={user}
        noteCount={noteCount}
        onProfileClick={onProfileClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section
        className="
          min-h-0
          flex-1
          overflow-hidden
          p-8
        "
      >
        <div
          className="
            flex
            h-full
            min-h-0
            gap-6
            transition-all
            duration-300
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

              ${isEditorOpen ? "w-72 shrink-0" : "w-full"}
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
                  font-serif
                  text-3xl
                  text-stone-900
                "
              >
                {title}
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-stone-500
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
                variant={isEditorOpen ? "sidebar" : "grid"}
                selectedNoteId={activeNote?.id ?? null}
                onNoteClick={handleNoteClick}
                filters={filters}
                searchQuery={searchQuery}
                onNoteCountChange={setNoteCount}
              />
            </div>
          </div>

          {/* Editor */}

          {isEditorOpen && (
            <div
              className="
                min-w-0
                min-h-0
                flex-1
                animate-in
                fade-in
                slide-in-from-right-4
                duration-300
              "
            >
              <NoteEditor
                key={isCreatingNote ? `new-note-${newNoteKey}` : activeNote?.id}
                note={activeNote ?? undefined}
                isNew={isCreatingNote}
                onClose={() => {
                  setSelectedNote(null);

                  setIsCreatingNote(false);
                }}
                onNoteCreated={(createdNote) => {
                  setSelectedNote(createdNote);

                  setIsCreatingNote(false);

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
  );
};

export default HomePage;
