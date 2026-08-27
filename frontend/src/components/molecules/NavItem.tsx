import { NavLink } from "react-router-dom"

type NavItemProps = {
  to: string
  children: React.ReactNode
}

const NavItem = ({ to, children }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
          flex
          items-center
          rounded-md
          px-3
          py-2
          text-sm
          transition
          ${
            isActive
              ? "bg-amber-100 text-amber-900"
              : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          }
        `
      }
    >
      {children}
    </NavLink>
  )
}

export default NavItem