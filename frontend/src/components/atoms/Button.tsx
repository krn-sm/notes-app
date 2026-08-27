type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset"
    onClick?: () => void
    disabled?: boolean
}

const Button = ({
    children,
    type = "button",
    onClick,
    disabled = false,
}: ButtonProps) => {
    return(
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="
                inline-flex
                items-center
                justify-center
                rounded-md
                bg-leather
                px-4
                py-2
                font-medium
                text-paper
                transition
                hover:bg-leather-dark
                disabled:cursor-not-allowed
                disabled:opacity-50
            "
        >
            {children}
            </button>
    )
}

export default Button