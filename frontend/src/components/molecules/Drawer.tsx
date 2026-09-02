import type { ReactNode } from "react";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Drawer = ({
  isOpen,
  onClose,
  children,
}: DrawerProps) => {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
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
        {children}
      </aside>
    </>
  );
};

export default Drawer;