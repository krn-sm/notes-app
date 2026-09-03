import { Tag } from "lucide-react";
import { NavLink } from "react-router-dom";

type CategoryNavItemProps = {
  name: string;
  count: number;
  path: string;
};

const CategoryNavItem = ({ name, count, path }: CategoryNavItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
          flex
          h-11
          min-w-0
          items-center
          justify-between
          rounded-xl
          px-3
          transition-all
          duration-200

          ${
            isActive
              ? "bg-[#453127] text-paper"
              : "text-paper/80 hover:bg-[#3b2b22] hover:text-paper"
          }
        `
      }
    >
      <div
        className="
          flex
          min-w-0
          items-center
          gap-4
        "
      >
        <Tag
          size={20}
          strokeWidth={1.7}
          className="
            shrink-0
            text-paper/70
          "
        />

        <span
          className="
            truncate
            font-body
            text-[15px]
          "
        >
          {name}
        </span>
      </div>

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
    </NavLink>
  );
};

export default CategoryNavItem;
