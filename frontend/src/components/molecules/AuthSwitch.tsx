import Button from "../atoms/Button"

type AuthSwitchProps = {
  text: string
  action: string
  onClick: () => void
}

const AuthSwitch = ({
  text,
  action,
  onClick,
}: AuthSwitchProps) => {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-1
        font-body
        text-sm
        text-ink-muted
      "
    >
      <span>{text}</span>

      <Button
        type="button"
        variant="ghost"
        onClick={onClick}
        className="
          !h-auto
          !p-0
          font-medium
          !text-gold
          hover:!bg-transparent
          hover:!text-gold-light
        "
      >
        {action}
      </Button>
    </div>
  )
}

export default AuthSwitch