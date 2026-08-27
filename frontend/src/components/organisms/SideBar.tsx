import {
  BookOpen,
  Plus,
  Star,
  StickyNote,
  Trash2,
} from "lucide-react"

import Button from "../atoms/Button"
import NavItem from "../molecules/NavItem"

const categories = [
  {
    name: "Personal",
    count: 8,
    color: "bg-[#73c7a5]",
    path: "/category/personal",
  },
  {
    name: "Work",
    count: 6,
    color: "bg-[#6098d6]",
    path: "/category/work",
  },
  {
    name: "Ideas",
    count: 4,
    color: "bg-[#a979cf]",
    path: "/category/ideas",
  },
  {
    name: "Study",
    count: 5,
    color: "bg-[#e8b955]",
    path: "/category/study",
  },
  {
    name: "Projects",
    count: 3,
    color: "bg-[#cf7a3b]",
    path: "/category/projects",
  },
]

const Sidebar = () => {
  return (
    <aside
      className="
        flex
        min-h-screen
        w-[300px]
        shrink-0
        flex-col
        border-r
        border-[#3b2a20]
        bg-[#2a1d16]
        px-5
        py-8
      "
    >
      {/* Brand */}

      <div className="flex items-center gap-3 px-1">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-md
            bg-paper
            text-ink
            shadow-[0_2px_8px_rgba(0,0,0,0.25)]
          "
        >
          <BookOpen
            size={19}
            strokeWidth={1.7}
          />
        </div>

        <h1
          className="
            text-[26px]
            font-medium
            tracking-wide
            text-paper
          "
        >
          Memoir
        </h1>
      </div>


      {/* New Note */}

      <div className="mt-9 px-1">
        <Button
          className="
            h-12
            w-full
            gap-2
            rounded-lg
            bg-[#f1d49b]
            px-4
            text-[15px]
            font-medium
            text-ink
            shadow-[0_3px_10px_rgba(0,0,0,0.28)]
            hover:bg-[#f6ddb0]
            active:scale-[0.99]
          "
        >
          <Plus
            size={20}
            strokeWidth={1.7}
          />

          <span>New Note</span>
        </Button>
      </div>


      {/* Navigation */}

      <nav className="mt-6 space-y-1">
        <NavItem
          to="/"
          end
          icon={
            <StickyNote
              size={19}
              strokeWidth={1.7}
            />
          }
        >
          All Notes
        </NavItem>

        <NavItem
          to="/favorites"
          icon={
            <Star
              size={19}
              strokeWidth={1.7}
            />
          }
        >
          Favorites
        </NavItem>

        <NavItem
          to="/trash"
          icon={
            <Trash2
              size={19}
              strokeWidth={1.7}
            />
          }
        >
          Trash
        </NavItem>
      </nav>


      {/* Categories */}

      <section className="mt-9">
        <p
          className="
            px-3
            text-[11px]
            font-medium
            uppercase
            tracking-[0.12em]
            text-gold-light/80
          "
        >
          Categories
        </p>

        <div className="mt-4 space-y-1">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className="
                group
                flex
                w-full
                items-center
                justify-between
                rounded-lg
                px-3
                py-2.5
                text-left
                text-[15px]
                text-paper/80
                transition-all
                duration-200
                hover:bg-[#3b2b22]
                hover:text-paper
                active:scale-[0.99]
              "
            >
              <div className="flex items-center gap-4">
                <span
                  className={`
                    h-3
                    w-3
                    shrink-0
                    rounded-full
                    ${category.color}
                    transition-transform
                    duration-200
                    group-hover:scale-110
                  `}
                />

                <span>
                  {category.name}
                </span>
              </div>

              <span
                className="
                  text-sm
                  text-gold-light/75
                  transition-colors
                  group-hover:text-gold-light
                "
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  )
}

export default Sidebar