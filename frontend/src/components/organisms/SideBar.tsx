import Button from "../atoms/Button"
import NavItem from "../molecules/NavItem"

const Sidebar = () => {
  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-stone-200 bg-stone-950 p-6">
      <h1 className="font-serif text-3xl text-stone-100">
        Notes
      </h1>

      <div className="mt-8">
        <Button>
          + New Note
        </Button>
      </div>

     <nav className="mt-8 space-y-2">
  <NavItem to="/">
    All Notes
  </NavItem>

  <NavItem to="/favorites">
    Favorites
  </NavItem>

  <NavItem to="/trash">
    Trash
  </NavItem>
</nav>
    </aside>
  )
}

export default Sidebar