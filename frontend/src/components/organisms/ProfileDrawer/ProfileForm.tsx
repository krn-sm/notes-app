import Button from "../../atoms/Button"
import FormField from "../../molecules/FormField"

type ProfileFormProps = {
  name: string
  email: string
  error: string
  hasChanges: boolean
  isLoading: boolean
  onNameChange: (value: string) => void
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void
}

const ProfileForm = ({
  name,
  email,
  error,
  hasChanges,
  isLoading,
  onNameChange,
  onSubmit,
}: ProfileFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="
        mt-10
        space-y-7
      "
    >
      <FormField
        label="Name"
        id="profile-name"
        type="text"
        value={name}
        onChange={(event) =>
          onNameChange(event.target.value)
        }
        required
      />

      <FormField
        label="Email"
        id="profile-email"
        type="email"
        value={email}
        disabled
      />

      <FormField
        label="Password"
        id="profile-password"
        type="password"
        value="••••••••"
        disabled
      />

      {error && (
        <p
          className="
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            font-body
            text-sm
            text-red-700
          "
        >
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={
          isLoading ||
          !hasChanges ||
          !name.trim()
        }
        className="
          h-12
          w-full
          text-[15px]
        "
      >
        Save changes
      </Button>
    </form>
  )
}

export default ProfileForm