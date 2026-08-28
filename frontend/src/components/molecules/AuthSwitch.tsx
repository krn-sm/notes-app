import { Link } from "react-router-dom"

type AuthSwitchProps = {
  text: string
  action: string
  to: string
}

const AuthSwitch = ({
  text,
  action,
  to,
}: AuthSwitchProps) => {
  return (
    <p
      className="
        text-center
        font-body
        text-sm
        text-ink-muted
      "
    >
      {text}

      <Link
        to={to}
        className="
          ml-1
          font-medium
          text-gold
          transition-colors
          hover:text-gold-light
        "
      >
        {action}
      </Link>
    </p>
  )
}

export default AuthSwitch