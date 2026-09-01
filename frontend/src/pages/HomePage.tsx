import { useState } from "react"

import {
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom"

import AppHeader from "../components/organisms/AppHeader"
import NoteEditor from "../components/organisms/NoteEditor"
import NoteList from "../components/organisms/NoteList"

import type { User } from "../services/authService"
import type { Note } from "../services/noteService"

type OutletContext = {
  user: User | null
  onProfileClick: () => void
}

const HomePage = () => {
  const {
    user,
    onProfileClick,
  } = useOutletContext<OutletContext>()

  const location = useLocation()
  const { tagId } = useParams()

  const [searchQuery, setSearchQuery] =
    useState("")

  const [
    notesRefreshKey,
    setNotesRefreshKey,
  ] = useState(0)

  const [
    selectedNote,
    setSelectedNote,
  ] = useState<Note | null>(null)

  const isEditorOpen =
    selectedNote !== null

  const handleNoteUpdated = (
    updatedNote: Note,
  ) => {
    setSelectedNote(updatedNote)

    setNotesRefreshKey(
      (current) => current + 1,
    )
  }

  const handleNoteDeleted = () => {
    setSelectedNote(null)

    setNotesRefreshKey(
      (current) => current + 1,
    )
  }

  const getPageDetails = () => {
    const path = location.pathname

    if (path === "/home/favorites") {
      return {
        title: "Favorites",
        description:
          "Notes you've marked as favorites.",
        filters: {
          favorite: true,
        },
      }
    }

    if (path === "/home/trash") {
      return {
        title: "Trash",
        description:
          "Notes you've moved to trash.",
        filters: {
          deleted: true,
        },
      }
    }

    if (tagId) {
      return {
        title: "Tags",
        description:
          "Notes with this tag.",
        filters: {
          tag_id: Number(tagId),
        },
      }
    }

    return {
      title: "All Notes",
      description:
        "Your thoughts, ideas, and memories.",
      filters: {},
    }
  }

  const {
    title,
    description,
    filters,
  } = getPageDetails()

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
          {/* Notes area */}

          <div
            className={`
              flex
              min-h-0
              flex-col
              transition-all
              duration-300
              ${
                isEditorOpen
                  ? "w-72 shrink-0"
                  : "w-full"
              }
            `}
          >
            {/* Page heading */}

            <div className="mb-6 shrink-0">
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

            {/* Note list */}

            <div
              className="
                min-h-0
                flex-1
                overflow-hidden
              "
            >
              <NoteList
                key={`${location.pathname}-${notesRefreshKey}`}
                variant={
                  isEditorOpen
                    ? "sidebar"
                    : "grid"
                }
                selectedNoteId={
                  selectedNote?.id ?? null
                }
                onNoteClick={setSelectedNote}
                filters={filters}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          {/* Editor */}

          {selectedNote && (
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
                key={selectedNote.id}
                note={selectedNote}
                onClose={() =>
                  setSelectedNote(null)
                }
                onNoteUpdated={
                  handleNoteUpdated
                }
                onNoteDeleted={
                  handleNoteDeleted
                }
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage