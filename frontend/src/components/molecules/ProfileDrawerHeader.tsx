import { X } from "lucide-react";

import Button from "../atoms/Button";

type ProfileDrawerHeaderProps = {
  onClose: () => void;
};

const ProfileDrawerHeader = ({ onClose }: ProfileDrawerHeaderProps) => {
  return (
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
        onClick={onClose}
        aria-label="Close profile"
        className="
          h-10
          w-10
          !rounded-xl
          !p-0
        "
      >
        <X size={20} strokeWidth={1.8} />
      </Button>
    </div>
  );
};

export default ProfileDrawerHeader;
