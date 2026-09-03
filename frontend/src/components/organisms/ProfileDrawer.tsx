import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Drawer from "../molecules/Drawer";

import { logout, updateProfile, type User } from "../../services/authService";

import ConfirmationModal from "../organisms/ConfirmationModal";

import ProfileDrawerFooter from "../molecules/ProfileDrawerFooter";
import ProfileDrawerHeader from "../molecules/ProfileDrawerHeader";
import ProfileForm from "../molecules/ProfileForm";
import ProfileInfo from "../molecules/ProfileInfo";

import { useToast } from "../../contexts/ToastContext";

type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  onUserUpdate: (user: User) => void;
};

const ProfileDrawer = ({
  isOpen,
  onClose,
  name,
  email,
  onUserUpdate,
}: ProfileDrawerProps) => {
  const { showToast } = useToast();

  const navigate = useNavigate();

  const [updatedName, setUpdatedName] = useState(name);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const hasChanges = updatedName.trim() !== name;

  const handleClose = () => {
    if (hasChanges) {
      setIsDiscardModalOpen(true);

      return;
    }

    onClose();
  };

  const handleDiscard = () => {
    setUpdatedName(name);

    setError("");

    setIsDiscardModalOpen(false);

    onClose();
  };

  const handleSaveRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasChanges || !updatedName.trim()) {
      return;
    }

    setIsSaveModalOpen(true);
  };

  const confirmSave = async () => {
    setError("");

    setIsLoading(true);

    try {
      const updatedUser = await updateProfile({
        name: updatedName.trim(),
      });

      onUserUpdate(updatedUser);

      setUpdatedName(updatedUser.name);

      setIsSaveModalOpen(false);

      onClose();

      showToast("Profile updated successfully", "success");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        showToast("Something went wrong", "error");
      }

      setIsSaveModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutRequest = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to logout",
        "error",
      );
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} onClose={handleClose}>
        <ProfileDrawerHeader onClose={handleClose} />

        <div
          className="
            flex-1
            overflow-y-auto
            px-5
            py-7

            sm:px-8
            sm:py-10
          "
        >
          <ProfileInfo name={name} email={email} />

          <ProfileForm
            name={updatedName}
            email={email}
            error={error}
            hasChanges={hasChanges}
            isLoading={isLoading}
            onNameChange={setUpdatedName}
            onSubmit={handleSaveRequest}
          />
        </div>

        <ProfileDrawerFooter onLogout={handleLogoutRequest} />
      </Drawer>

      {/* Discard Changes */}

      <ConfirmationModal
        isOpen={isDiscardModalOpen}
        title="Discard changes?"
        description="You have unsaved changes. Are you sure you want to discard them?"
        cancelLabel="Keep editing"
        confirmLabel="Discard"
        onCancel={() => setIsDiscardModalOpen(false)}
        onConfirm={handleDiscard}
        danger
      />

      {/* Save Changes */}

      <ConfirmationModal
        isOpen={isSaveModalOpen}
        title="Save changes?"
        description="Are you sure you want to update your name?"
        cancelLabel="Keep editing"
        confirmLabel="Save changes"
        onCancel={() => setIsSaveModalOpen(false)}
        onConfirm={confirmSave}
        isLoading={isLoading}
      />

      {/* Logout */}

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Log out?"
        description="Are you sure you want to log out of Memoir?"
        cancelLabel="Stay"
        confirmLabel="Log out"
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        danger
      />
    </>
  );
};

export default ProfileDrawer;
