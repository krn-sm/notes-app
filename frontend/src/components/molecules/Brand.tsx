import logo from "../../assets/logo.png"

type BrandProps = {
  collapsed?: boolean
}

const Brand = ({
  collapsed = false,
}: BrandProps) => {
  return (
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
          h-10
          w-10
          shrink-0
          object-contain
          sm:h-12
          sm:w-12
        "
      />

      {!collapsed && (
        <h1
          className="
            font-display
            text-[28px]
            font-medium
            tracking-wide
            text-paper
          "
        >
          Memoir
        </h1>
      )}
    </div>
  )
}

export default Brand