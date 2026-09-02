import { useState } from "react"

import {
  Outlet,
} from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"

import ProfileDrawer from "../components/organisms/ProfileDrawer"
import Sidebar from "../components/organisms/SideBar"

const AppLayout = () => {
  const {
    user,
    setUser,
  } = useAuth()

  const [
    isProfileOpen,
    setIsProfileOpen,
  ] = useState(false)

  const [
    isCreatingNote,
    setIsCreatingNote,
  ] = useState(false)

  const [
    newNoteKey,
    setNewNoteKey,
  ] = useState(0)

  const handleNewNote = () => {
    setIsCreatingNote(true)

    setNewNoteKey(
      (current) => current + 1,
    )
  }

  return (
    <div
      className="
        flex
        h-screen
        overflow-hidden
        bg-paper
      "
    >
      {/* Sidebar */}

      <div
        className="
          relative
          z-30
          shrink-0
          overflow-visible
        "
      >
        <Sidebar
          onNewNote={handleNewNote}
        />
      </div>

      {/* Main Area */}

      <main
        className="
          relative
          z-10
          min-w-0
          flex-1
          overflow-hidden
        "
      >
        <div
          className="
            h-full
            overflow-hidden
          "
        >
          <Outlet
            context={{
              user,

              onProfileClick: () =>
                setIsProfileOpen(true),

              isCreatingNote,

              setIsCreatingNote,

              newNoteKey,
            }}
          />
        </div>
      </main>

      {/* Profile Drawer */}

      {user && (
        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={() =>
            setIsProfileOpen(false)
          }
          name={user.name}
          email={user.email}
          onUserUpdate={setUser}
        />
      )}
    </div>
  )
}

export default AppLayout