import {
  ChevronLeft,
  ChevronRight,
  ListTodo,
  Plus,
  Star,
  Tag,
  Trash2,
} from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

import logo from "../../assets/logo.png"

import Button from "../atoms/Button"
import NavItem from "../molecules/NavItem"

const categories = [
  {
    name: "Personal",
    count: 8,
    path: "/category/personal",
  },
  {
    name: "Work",
    count: 6,
    path: "/category/work",
  },
  {
    name: "Ideas",
    count: 4,
    path: "/category/ideas",
  },
  {
    name: "Study",
    count: 5,
    path: "/category/study",
  },
  {
    name: "Projects",
    count: 3,
    path: "/category/projects",
  },
]

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`
        relative
        flex
        min-h-screen
        shrink-0
        flex-col
        overflow-visible
        border-r
        border-dashed
        border-[#4a3626]
        bg-leather
        py-8
        transition-[width,padding]
        duration-300
        ease-in-out

        ${collapsed ? "w-[88px] px-4" : "w-[300px] px-5"}
      `}
    >
      {/* Collapse Button */}
      <Button
        variant="primary"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="
          absolute
          top-1/2
          -right-4
          z-20
          h-9
          w-9
          -translate-y-1/2
          !rounded-xl
          !p-0
          border-[2px]
          border-solid
          border-leather
          shadow-[0_3px_10px_rgba(0,0,0,0.35)]
        "
      >
        {collapsed ? (
          <ChevronRight size={17} strokeWidth={1.8} />
        ) : (
          <ChevronLeft size={17} strokeWidth={1.8} />
        )}
      </Button>

      {/* Brand */}
      <div
        className={`
          flex
          items-center
          ${collapsed ? "justify-center" : "gap-4 px-2"}
        `}
      >
        <img
          src={logo}
          alt="Memoir"
          className="
            h-12
            w-12
            shrink-0
            object-contain
          "
        />

        {!collapsed && (
          <h1
            className="
              font-display
              text-[32px]
              font-semibold
              leading-none
              tracking-wide
              text-paper
            "
          >
            Memoir
          </h1>
        )}
      </div>

      {/* New Note */}
      <div
        className={`
          mt-10
          ${collapsed ? "" : "px-1"}
        `}
      >
        <Button
          variant="primary"
          className="
            h-12
            w-full
            gap-2
            rounded-2xl
            font-body
            text-[15px]
          "
        >
          <Plus size={20} strokeWidth={1.8} />

          {!collapsed && <span>New Note</span>}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-1">
        <NavItem
          to="/"
          end
          collapsed={collapsed}
          icon={<ListTodo size={19} strokeWidth={1.7} />}
        >
          All Notes
        </NavItem>

        <NavItem
          to="/favorites"
          collapsed={collapsed}
          icon={<Star size={19} strokeWidth={1.7} />}
        >
          Favorites
        </NavItem>

        <NavItem
          to="/trash"
          collapsed={collapsed}
          icon={<Trash2 size={19} strokeWidth={1.7} />}
        >
          Trash
        </NavItem>
      </nav>

      {/* Categories */}
      <section className="mt-10">
        {!collapsed && (
          <p
            className="
              px-3
              font-body
              text-[11px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-gold-light
            "
          >
            Categories
          </p>
        )}

        <div
          className={`
            space-y-1
            ${collapsed ? "mt-2" : "mt-5"}
          `}
        >
          {categories.map((category) => (
            <NavLink
              key={category.name}
              to={category.path}
              title={collapsed ? category.name : undefined}
              className={({ isActive }) =>
                `
                  group
                  flex
                  h-11
                  w-full
                  items-center
                  rounded-xl
                  font-body
                  transition-all
                  duration-200

                  ${collapsed ? "justify-center" : "justify-between px-3"}

                  ${
                    isActive
                      ? "bg-leather-light text-paper"
                      : "text-paper/80 hover:bg-[#3b2b22] hover:text-paper"
                  }
                `
              }
            >
              <div
                className={`
                  flex
                  items-center
                  ${collapsed ? "justify-center" : "gap-4"}
                `}
              >
                <Tag
                  size={20}
                  strokeWidth={1.7}
                  className="
                    shrink-0
                    text-paper/70
                    transition
                    group-hover:text-paper
                  "
                />

                {!collapsed && (
                  <span className="text-[15px]">
                    {category.name}
                  </span>
                )}
              </div>

              {!collapsed && (
                <span
                  className="
                    ml-4
                    shrink-0
                    text-sm
                    text-gold-light
                  "
                >
                  {category.count}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </section>
    </aside>
  )
}

export default Sidebar