import {
  Tag,
  Trash2,
} from "lucide-react"

import { NavLink } from "react-router-dom"

import Button from "../atoms/Button"

type CategoryNavItemProps = {
  name: string
  count: number
  path: string
  collapsed?: boolean
  onDelete?: () => void
}

const CategoryNavItem = ({
  name,
  count,
  path,
  collapsed = false,
  onDelete,
}: CategoryNavItemProps) => {
  return (
    <div
      className="
        flex
        h-11
        items-center
      "
    >
      <NavLink
        to={path}
        title={collapsed ? name : undefined}
        className={({ isActive }) =>
          `
            flex
            h-full
            min-w-0
            flex-1
            items-center
            rounded-xl
            transition-all
            duration-200

            ${
              collapsed
                ? "justify-center"
                : "justify-between px-3"
            }

            ${
              isActive
                ? "bg-[#453127] text-paper"
                : "text-paper/80 hover:bg-[#3b2b22] hover:text-paper"
            }
          `
        }
      >
        <div
          className={`
            flex
            min-w-0
            items-center
            ${
              collapsed
                ? "justify-center"
                : "gap-4"
            }
          `}
        >
          <Tag
            size={20}
            strokeWidth={1.7}
            className="
              shrink-0
              text-paper/70
            "
          />

          {!collapsed && (
            <span
              className="
                truncate
                font-body
                text-[15px]
              "
            >
              {name}
            </span>
          )}
        </div>
      </NavLink>

      {!collapsed && (
        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            pr-3
          "
        >
          {count === 0 && onDelete && (
            <Button
              variant="ghost"
              onClick={onDelete}
              aria-label={`Delete ${name} tag`}
              className="
                h-8
                w-8
                !p-0
                text-paper/50
                hover:!bg-[#3b2b22]
                hover:text-paper
              "
            >
              <Trash2
                size={15}
                strokeWidth={1.7}
              />
            </Button>
          )}

          <span
            className="
              font-body
              text-sm
              text-[#d8b778]
            "
          >
            {count}
          </span>
        </div>
      )}
    </div>
  )
}

export default CategoryNavItem