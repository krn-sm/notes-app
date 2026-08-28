import Button from "../atoms/Button"
import Modal from "../molecules/Modal"

type ConfirmationModalProps = {
  isOpen: boolean
  title: string
  description: string
  cancelLabel?: string
  confirmLabel: string
  onCancel: () => void
  onConfirm: () => void
  isLoading?: boolean
  danger?: boolean
}

const ConfirmationModal = ({
  isOpen,
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel,
  onCancel,
  onConfirm,
  isLoading = false,
  danger = false,
}: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
    >
      <p
        className="
          font-body
          text-sm
          leading-relaxed
          text-ink-muted
        "
      >
        {description}
      </p>

      <div
        className="
          mt-7
          flex
          justify-end
          gap-3
        "
      >
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelLabel}
        </Button>

        <Button
          variant={danger ? "ghost" : "primary"}
          onClick={onConfirm}
          disabled={isLoading}
          className={
            danger
              ? "text-red-600 hover:!bg-red-50 border-[2px]"
              : ""
          }
        >
          {isLoading
            ? "Please wait..."
            : confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal