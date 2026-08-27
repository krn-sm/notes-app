import Avatar from "../atoms/Avatar"
import SearchBar from "../molecules/SearchBar"

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 px-8 py-5">
      <div>
        <h1 className="font-serif text-2xl text-stone-900">
          Good morning, Kiran 👋
        </h1>

        <p className="mt-1 text-sm text-stone-500">
          You have 23 notes
        </p>
      </div>

      <div className="flex items-center gap-6">
        <SearchBar />

        <Avatar />
      </div>
    </header>
  )
}

export default Navbar