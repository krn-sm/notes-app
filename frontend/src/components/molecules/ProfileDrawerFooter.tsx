import Button from "../atoms/Button";

type ProfileDrawerFooterProps = {
  onLogout: () => void;
};

const ProfileDrawerFooter = ({ onLogout }: ProfileDrawerFooterProps) => {
  return (
    <div
      className="
        border-t
        border-line
        p-6
      "
    >
      <Button
        variant="ghost"
        onClick={onLogout}
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
  );
};

export default ProfileDrawerFooter;
