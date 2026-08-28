import Avatar from "../../atoms/Avatar"

type ProfileInfoProps = {
  name: string
  email: string
}

const ProfileInfo = ({
  name,
  email,
}: ProfileInfoProps) => {
  return (
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
  )
}

export default ProfileInfo