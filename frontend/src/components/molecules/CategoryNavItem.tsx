import { Tag } from "lucide-react";

import { NavLink } from "react-router-dom";

type CategoryNavItemProps = {
  name: string;
  count: number;
  path: string;
  collapsed?: boolean;
};

const CategoryNavItem = ({
  name,
  count,
  path,
  collapsed = false,
}: CategoryNavItemProps) => {
  return (
    <NavLink
      to={path}
      title={collapsed ? name : undefined}
      className={({ isActive }) =>
        `
          flex
          h-11
          min-w-0
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

      {!collapsed && (
        <span
          className="
            shrink-0
            font-body
            text-sm
            text-[#d8b778]
          "
        >
          {count}
        </span>
      )}
    </NavLink>
  );
};

export default CategoryNavItem;