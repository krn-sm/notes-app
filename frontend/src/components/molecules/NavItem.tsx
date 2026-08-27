import { NavLink } from "react-router-dom"

type NavItemProps = {
  to: string
  children: React.ReactNode
  icon?: React.ReactNode
  end?: boolean
}

const NavItem = ({
  to,
  children,
  icon,
  end = false,
}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
          group
          flex
          items-center
          gap-3
          rounded-lg
          px-4
          py-3
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

      <span>{children}</span>
    </NavLink>
  )
}

export default NavItem