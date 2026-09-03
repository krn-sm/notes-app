import { createPortal } from "react-dom";
import { X } from "lucide-react";

import Button from "../atoms/Button";

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="
          fixed
          inset-0
          z-[100]
          bg-black/40
          backdrop-blur-[2px]
        "
      />

      {/* Modal */}

      <div
        className="
          fixed
          inset-0
          z-[110]
          flex
          items-center
          justify-center
          px-6

          max-md:items-end
          max-md:px-0
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-2xl
            border
            border-line
            bg-paper
            shadow-[0_20px_60px_rgba(0,0,0,0.2)]

            max-md:max-w-none
            max-md:rounded-b-none
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-line
              px-7
              py-5

              max-md:px-6
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
              {title}
            </h2>

            <Button
              variant="ghost"
              onClick={onClose}
              aria-label="Close modal"
              className="
                h-9
                w-9
                !rounded-lg
                !p-0
              "
            >
              <X
                size={18}
                strokeWidth={1.8}
              />
            </Button>
          </div>

          {/* Content */}

          <div
            className="
              px-7
              py-6

              max-md:px-6
              max-md:py-5
            "
          >
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;