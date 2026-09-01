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

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null)

  const isEditorOpen =
    selectedNote !== null

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
        title: "Category",
        description:
          "Notes with this category.",
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
    <>
      <AppHeader
        user={user}
        onProfileClick={onProfileClick}
      />

      <section
        className="
          h-full
          overflow-hidden
          p-8
        "
      >
        <div
          className="
            flex
            h-full
            gap-6
            transition-all
            duration-300
          "
        >
          {/* Notes area */}

          <div
            className={`
              min-w-0
              transition-all
              duration-300
              ${
                isEditorOpen
                  ? "w-72 shrink-0"
                  : "w-full"
              }
            `}
          >
            <div className="mb-6">
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

            <NoteList
              key={location.pathname}
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
            />
          </div>

          {/* Editor */}

          {selectedNote && (
            <div
              className="
                min-w-0
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
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default HomePage