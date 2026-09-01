import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Toast from "../components/molecules/Toast";
import ProfileDrawer from "../components/organisms/ProfileDrawer";
import Sidebar from "../components/organisms/SideBar";

import {
  getCurrentUser,
  type User,
} from "../services/authService";

const AppLayout = () => {
  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  const [toastMessage, setToastMessage] =
    useState("");

  const [
    isCreatingNote,
    setIsCreatingNote,
  ] = useState(false);

  const [
    newNoteKey,
    setNewNoteKey,
  ] = useState(0);

  const handleNewNote = () => {
    setIsCreatingNote(true);

    setNewNoteKey(
      (current) => current + 1,
    );
  };

  const showToast = (
    message: string,
  ) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser =
          await getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, []);

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
          showToast={showToast}
        />
      )}

      {/* Toast */}

      <Toast
        message={toastMessage}
        isVisible={Boolean(toastMessage)}
        onClose={() =>
          setToastMessage("")
        }
      />
    </div>
  );
};

export default AppLayout;