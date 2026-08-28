import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Toast from "../components/molecules/Toast";
import AppHeader from "../components/organisms/AppHeader";
import ProfileDrawer from "../components/organisms/ProfileDrawer/ProfileDrawer";
import SideBar from "../components/organisms/SideBar";

import { getCurrentUser, type User } from "../services/authService";

const AppLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-paper">
      <SideBar />

      <main className="flex min-w-0 flex-1 flex-col">
        <AppHeader user={user} onProfileClick={() => setIsProfileOpen(true)} />

        <div className="flex-1">
          <Outlet />
        </div>
      </main>

      {user && (
        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          name={user.name}
          email={user.email}
          onUserUpdate={setUser}
          showToast={showToast}
        />
      )}
      <Toast
        message={toastMessage}
        isVisible={Boolean(toastMessage)}
        onClose={() => setToastMessage("")}
      />
    </div>
  );
};

export default AppLayout;
