import { Search } from "lucide-react"

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
    <div
      className="
        flex
        h-11
        w-full
        items-center
        rounded-xl
        border
        border-line
        bg-paper-dark/40
        px-4
        transition-colors
        focus-within:border-gold
      "
    >
      <Search
        size={18}
        strokeWidth={1.8}
        className="mr-3 shrink-0 text-ink-muted"
      />

      <Input
        type="search"
        placeholder="Search notes..."
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-full
          min-w-0
          px-0
          py-0
          text-sm
        "
      />
    </div>
  )
}

export default SearchBar