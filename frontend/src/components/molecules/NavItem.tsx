import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  end?: boolean;
  collapsed?: boolean;
};

const NavItem = ({
  to,
  children,
  icon,
  end = false,
  collapsed = false,
}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      title={collapsed ? String(children) : undefined}
      className={({ isActive }) =>
        `
          group
          flex
          items-center
          ${collapsed ? "justify-center px-0" : "gap-3 px-4"}
          rounded-xl
          py-3
          font-body
          text-[15px]
          transition-all
          duration-200

          ${
            isActive
              ? `
                bg-[#4a382d]
                text-paper
                shadow-sm
              `
              : `
                text-paper/75
                hover:bg-[#3b2b22]
                hover:text-paper
              `
          }
        `
      }
    >
      {icon && (
        <span
          className="
            flex
            h-5
            w-5
            shrink-0
            items-center
            justify-center
            text-paper/70
            transition-colors
            group-hover:text-paper
          "
        >
          {icon}
        </span>
      )}

      {!collapsed && <span className="whitespace-nowrap">{children}</span>}
    </NavLink>
  );
};

export default NavItem;
