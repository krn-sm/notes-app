import {
  useEffect,
  useState,
} from "react"

import NoteCard from "../molecules/NoteCard"
import ConfirmationModal from "../organisms/ConfirmationModal"

import {
  deleteNote,
  getNotes,
  permanentlyDeleteNote,
  restoreNote,
  updateNote,
  type Note,
} from "../../services/noteService"

type NoteFilters = {
  favorite?: boolean
  deleted?: boolean
  tag_id?: number
}

type NoteListProps = {
  variant?: "grid" | "sidebar"
  selectedNoteId?: number | null
  onNoteClick: (note: Note) => void
  filters?: NoteFilters
  searchQuery?: string
}

const formatDate = (
  dateString: string,
) => {
  const date = new Date(dateString)
  const now = new Date()

  const difference =
    now.getTime() - date.getTime()

  const minutes = Math.floor(
    difference / (1000 * 60),
  )

  const hours = Math.floor(
    difference / (1000 * 60 * 60),
  )

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24),
  )

  if (minutes < 1) {
    return "Just now"
  }

  if (minutes < 60) {
    return `${minutes} min ago`
  }

  if (hours < 24) {
    return `${hours} hour${
      hours > 1 ? "s" : ""
    } ago`
  }

  if (days === 1) {
    return "Yesterday"
  }

  if (days < 7) {
    return `${days} days ago`
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year:
        date.getFullYear() !==
        now.getFullYear()
          ? "numeric"
          : undefined,
    },
  )
}

const NoteList = ({
  variant = "grid",
  selectedNoteId = null,
  onNoteClick,
  filters = {},
  searchQuery = "",
}: NoteListProps) => {
  const {
    favorite,
    deleted,
    tag_id,
  } = filters

  const [notes, setNotes] =
    useState<Note[]>([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  const [
    noteToDelete,
    setNoteToDelete,
  ] = useState<Note | null>(null)

  const [
    noteToRestore,
    setNoteToRestore,
  ] = useState<Note | null>(null)

  const [isDeleting, setIsDeleting] =
    useState(false)

  const [isRestoring, setIsRestoring] =
    useState(false)

  const [
  debouncedSearchQuery,
  setDebouncedSearchQuery,
] = useState(searchQuery)

useEffect(() => {
  const timeout = setTimeout(() => {
    setDebouncedSearchQuery(searchQuery)
  }, 400)

  return () => {
    clearTimeout(timeout)
  }
}, [searchQuery])
  
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setIsLoading(true)
        setError("")

        const response =
          await getNotes({
            favorite,
            deleted,
            tag_id,
            q: debouncedSearchQuery || undefined,
          })

        setNotes(response.items)
      } catch (error) {
        console.error(error)

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load notes",
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadNotes()
  }, [
    favorite,
    deleted,
    tag_id,
    debouncedSearchQuery,
  ])

  const noteMatchesFilters = (
    note: Note,
  ) => {
    if (
      favorite !== undefined &&
      note.is_favorite !== favorite
    ) {
      return false
    }

    if (
      deleted !== undefined &&
      note.is_deleted !== deleted
    ) {
      return false
    }

    if (
      tag_id !== undefined &&
      !note.tags.some(
        (tag) =>
          tag.id === tag_id,
      )
    ) {
      return false
    }

    return true
  }

  const handleFavoriteToggle = async (
    note: Note,
  ) => {
    try {
      const updatedNote =
        await updateNote(note.id, {
          is_favorite:
            !note.is_favorite,
        })

      setNotes((currentNotes) => {
        if (
          !noteMatchesFilters(
            updatedNote,
          )
        ) {
          return currentNotes.filter(
            (currentNote) =>
              currentNote.id !==
              updatedNote.id,
          )
        }

        return currentNotes.map(
          (currentNote) =>
            currentNote.id ===
            updatedNote.id
              ? updatedNote
              : currentNote,
        )
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteClick = (
    noteId: number,
  ) => {
    const selectedNote =
      notes.find(
        (note) =>
          note.id === noteId,
      )

    if (selectedNote) {
      setNoteToDelete(
        selectedNote,
      )
    }
  }

  const handleRestoreClick = (
    noteId: number,
  ) => {
    const selectedNote =
      notes.find(
        (note) =>
          note.id === noteId,
      )

    if (selectedNote) {
      setNoteToRestore(
        selectedNote,
      )
    }
  }

  const handleConfirmDelete =
    async () => {
      if (!noteToDelete) {
        return
      }

      try {
        setIsDeleting(true)
        setError("")

        if (noteToDelete.is_deleted) {
          await permanentlyDeleteNote(
            noteToDelete.id,
          )
        } else {
          await deleteNote(
            noteToDelete.id,
          )
        }

        setNotes((currentNotes) =>
          currentNotes.filter(
            (note) =>
              note.id !==
              noteToDelete.id,
          ),
        )

        setNoteToDelete(null)
      } catch (error) {
        console.error(error)

        setError(
          error instanceof Error
            ? error.message
            : "Failed to delete note",
        )
      } finally {
        setIsDeleting(false)
      }
    }

  const handleConfirmRestore =
    async () => {
      if (!noteToRestore) {
        return
      }

      try {
        setIsRestoring(true)
        setError("")

        await restoreNote(
          noteToRestore.id,
        )

        setNotes((currentNotes) =>
          currentNotes.filter(
            (note) =>
              note.id !==
              noteToRestore.id,
          ),
        )

        setNoteToRestore(null)
      } catch (error) {
        console.error(error)

        setError(
          error instanceof Error
            ? error.message
            : "Failed to restore note",
        )
      } finally {
        setIsRestoring(false)
      }
    }

  if (isLoading) {
    return (
      <p
        className="
          font-body
          text-sm
          text-ink-muted
        "
      >
        Loading notes...
      </p>
    )
  }

  if (
    error &&
    notes.length === 0
  ) {
    return (
      <p
        className="
          font-body
          text-sm
          text-red-500
        "
      >
        {error}
      </p>
    )
  }

  return (
    <>
      {notes.length === 0 ? (
        <div className="py-16 text-center">
          <h2
            className="
              font-display
              text-2xl
              text-ink
            "
          >
            No notes yet
          </h2>

          <p
            className="
              mt-2
              font-body
              text-sm
              text-ink-muted
            "
          >
            Start writing your first note.
          </p>
        </div>
      ) : (
        <section
          className={`
            transition-all
            duration-300
            ${
              variant === "grid"
                ? `
                  grid
                  gap-6
                  sm:grid-cols-2
                  xl:grid-cols-3
                  2xl:grid-cols-4
                `
                : `
                  flex
                  flex-col
                  gap-3
                  overflow-y-auto
                `
            }
          `}
        >
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              preview={note.content}
              date={formatDate(
                note.updated_at,
              )}
              tags={note.tags}
              isFavorite={
                note.is_favorite
              }
              isDeleted={
                note.is_deleted
              }
              isSelected={
                note.id ===
                selectedNoteId
              }
              onClick={() =>
                onNoteClick(note)
              }
              onFavoriteToggle={(
                id,
              ) => {
                const selectedNote =
                  notes.find(
                    (note) =>
                      note.id === id,
                  )

                if (selectedNote) {
                  handleFavoriteToggle(
                    selectedNote,
                  )
                }
              }}
              onDelete={
                handleDeleteClick
              }
              onRestore={
                handleRestoreClick
              }
            />
          ))}
        </section>
      )}

      <ConfirmationModal
        isOpen={
          noteToDelete !== null
        }
        title={
          noteToDelete?.is_deleted
            ? "Permanently delete note?"
            : "Move note to trash?"
        }
        description={
          noteToDelete
            ? noteToDelete.is_deleted
              ? `"${noteToDelete.title}" will be permanently deleted and cannot be recovered.`
              : `"${noteToDelete.title}" will be moved to the trash.`
            : ""
        }
        cancelLabel="Cancel"
        confirmLabel={
          noteToDelete?.is_deleted
            ? "Delete Permanently"
            : "Move to Trash"
        }
        onCancel={() =>
          setNoteToDelete(null)
        }
        onConfirm={
          handleConfirmDelete
        }
        isLoading={isDeleting}
        danger
      />

      <ConfirmationModal
        isOpen={
          noteToRestore !== null
        }
        title="Restore note?"
        description={
          noteToRestore
            ? `"${noteToRestore.title}" will be restored to your notes.`
            : ""
        }
        cancelLabel="Cancel"
        confirmLabel="Restore"
        onCancel={() =>
          setNoteToRestore(null)
        }
        onConfirm={
          handleConfirmRestore
        }
        isLoading={isRestoring}
      />
    </>
  )
}

export default NoteList