import Input from "../atoms/Input"

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Search your notes..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar