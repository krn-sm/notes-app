import Button from "../atoms/Button";
import Modal from "../molecules/Modal";

type DiscardModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onDiscard: () => void;
};

const DiscardModal = ({ isOpen, onCancel, onDiscard }: DiscardModalProps) => {
  return (
    <Modal isOpen={isOpen} title="Discard changes?" onClose={onCancel}>
      <p
        className="
          font-body
          text-sm
          leading-relaxed
          text-ink-muted
        "
      >
        You have unsaved changes. Are you sure you want to discard them?
      </p>

      <div
        className="
          mt-7
          flex
          justify-end
          gap-3
        "
      >
        <Button variant="ghost" onClick={onCancel}>
          Keep editing
        </Button>

        <Button variant="primary" onClick={onDiscard}>
          Discard
        </Button>
      </div>
    </Modal>
  );
};

export default DiscardModal;
