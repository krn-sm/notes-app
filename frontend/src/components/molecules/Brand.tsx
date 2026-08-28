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