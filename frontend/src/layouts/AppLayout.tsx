import { useState } from "react";

import { Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import ConfirmationModal from "../components/organisms/ConfirmationModal";
import ProfileDrawer from "../components/organisms/ProfileDrawer";
import Sidebar from "../components/organisms/SideBar";

const AppLayout = () => {
  const { user, setUser } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [isEditorDirty, setIsEditorDirty] = useState(false);

  const [newNoteKey, setNewNoteKey] = useState(0);

  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  const [pendingNewNote, setPendingNewNote] = useState(false);

  const createNewNote = () => {
    setIsCreatingNote(true);

    setIsEditorOpen(true);

    setIsEditorDirty(false);

    setNewNoteKey((current) => current + 1);
  };

  const handleNewNote = () => {
    if (isEditorOpen && isEditorDirty) {
      setPendingNewNote(true);

      setIsDiscardModalOpen(true);

      return;
    }

    createNewNote();
  };

  const handleDiscardChanges = () => {
    setIsDiscardModalOpen(false);

    setIsEditorDirty(false);

    if (pendingNewNote) {
      setPendingNewNote(false);

      createNewNote();
    }
  };

  const handleCancelDiscard = () => {
    setIsDiscardModalOpen(false);

    setPendingNewNote(false);
  };

  return (
    <>
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
          className={`
            relative
            z-30
            shrink-0
            overflow-visible

            ${isEditorOpen ? "hidden md:block" : "block"}
          `}
        >
          <Sidebar onNewNote={handleNewNote} />
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
          <Outlet
            context={{
              user,

              onProfileClick: () => setIsProfileOpen(true),

              isCreatingNote,

              setIsCreatingNote,

              isEditorOpen,

              setIsEditorOpen,

              isEditorDirty,

              setIsEditorDirty,

              newNoteKey,
            }}
          />
        </main>

        {/* Profile Drawer */}

        {user && (
          <ProfileDrawer
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            name={user.name}
            email={user.email}
            onUserUpdate={setUser}
          />
        )}
      </div>

      {/* Discard Changes */}

      <ConfirmationModal
        isOpen={isDiscardModalOpen}
        title="Discard unsaved changes?"
        description="Your changes haven't been saved. They will be lost if you continue."
        cancelLabel="Keep Editing"
        confirmLabel="Discard Changes"
        onCancel={handleCancelDiscard}
        onConfirm={handleDiscardChanges}
        danger
      />
    </>
  );
};

export default AppLayout;
