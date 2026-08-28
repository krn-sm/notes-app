import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  logout,
  updateProfile,
  type User,
} from "../../services/authService";

import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import ConfirmationModal from "../organisms/ConfirmationModal";

type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  onUserUpdate: (user: User) => void;
  showToast: (message: string) => void
};

const ProfileDrawer = ({
  isOpen,
  onClose,
  name,
  email,
  onUserUpdate,
  showToast
}: ProfileDrawerProps) => {
  const navigate = useNavigate();

  const [updatedName, setUpdatedName] = useState(name);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isDiscardModalOpen, setIsDiscardModalOpen] =
    useState(false);

  const [isSaveModalOpen, setIsSaveModalOpen] =
    useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] =
    useState(false);

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

  // Opens the save confirmation modal
  const handleSaveRequest = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!hasChanges || !updatedName.trim()) {
      return;
    }

    setIsSaveModalOpen(true);
  };

  // Actually saves the updated name
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

      showToast("Name updated successfully")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }

      setIsSaveModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Opens the logout confirmation modal
  const handleLogoutRequest = () => {
    setIsLogoutModalOpen(true);
  };

  // Actually logs the user out
  const handleLogout = async () => {
    try {
      await logout();

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`
          fixed
          inset-0
          z-40
          bg-black/30
          transition-opacity
          duration-300

          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed
          inset-y-0
          right-0
          z-50
          flex
          w-full
          max-w-[420px]
          flex-col
          border-l
          border-line
          bg-paper
          shadow-[-10px_0_30px_rgba(0,0,0,0.12)]
          transition-transform
          duration-300
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-line
            px-8
            py-7
          "
        >
          <h2
            className="
              font-display
              text-2xl
              font-medium
              text-ink
            "
          >
            Profile
          </h2>

          <Button
            variant="ghost"
            onClick={handleClose}
            aria-label="Close profile"
            className="
              h-10
              w-10
              !rounded-xl
              !p-0
            "
          >
            <X
              size={20}
              strokeWidth={1.8}
            />
          </Button>
        </div>

        {/* Content */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-8
            py-10
          "
        >
          {/* User */}
          <div
            className="
              flex
              flex-col
              items-center
            "
          >
            <Avatar name={name} />

            <p
              className="
                mt-4
                font-display
                text-xl
                font-medium
                text-ink
              "
            >
              {name}
            </p>

            <p
              className="
                mt-1
                font-body
                text-sm
                text-ink-muted
              "
            >
              {email}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSaveRequest}
            className="
              mt-10
              space-y-7
            "
          >
            <FormField
              label="Name"
              id="profile-name"
              type="text"
              value={updatedName}
              onChange={(event) =>
                setUpdatedName(event.target.value)
              }
              required
            />

            <FormField
              label="Email"
              id="profile-email"
              type="email"
              value={email}
              disabled
            />

            <FormField
              label="Password"
              id="profile-password"
              type="password"
              value="••••••••"
              disabled
            />

            {error && (
              <p
                className="
                  rounded-lg
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  font-body
                  text-sm
                  text-red-700
                "
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={
                isLoading ||
                !hasChanges ||
                !updatedName.trim()
              }
              className="
                h-12
                w-full
                text-[15px]
              "
            >
              Save changes
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div
          className="
            border-t
            border-line
            p-6
          "
        >
          <Button
            variant="ghost"
            onClick={handleLogoutRequest}
            className="
              h-12
              w-full
              border-[2px]
              text-red-600
            "
          >
            Log out
          </Button>
        </div>
      </aside>

      {/* Discard Changes */}
      <ConfirmationModal
        isOpen={isDiscardModalOpen}
        title="Discard changes?"
        description="You have unsaved changes. Are you sure you want to discard them?"
        cancelLabel="Keep editing"
        confirmLabel="Discard"
        onCancel={() =>
          setIsDiscardModalOpen(false)
        }
        onConfirm={handleDiscard}
        danger
      />

      {/* Save Name */}
      <ConfirmationModal
        isOpen={isSaveModalOpen}
        title="Save changes?"
        description="Are you sure you want to update your name?"
        cancelLabel="Keep editing"
        confirmLabel="Save changes"
        onCancel={() =>
          setIsSaveModalOpen(false)
        }
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
        onCancel={() =>
          setIsLogoutModalOpen(false)
        }
        onConfirm={handleLogout}
        danger
      />
    </>
  );
};

export default ProfileDrawer;