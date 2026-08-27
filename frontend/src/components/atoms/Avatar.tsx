type AvatarProps = {
  name: string
  imageUrl?: string
  className?: string
}

const Avatar = ({
  name,
  imageUrl,
  className = "",
}: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-line
        bg-paper-dark
        font-body
        text-sm
        font-semibold
        text-ink
        ${className}
      `}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  )
}

export default Avatar