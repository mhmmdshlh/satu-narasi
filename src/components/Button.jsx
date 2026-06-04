export const Btn = ({ text, children, onClick, color, size = "md", disabled, type = "button", className = "" }) => {
    const sizeClasses = {
        sm: "sm:text-sm",
        md: "sm:px-6 sm:py-3 sm:text-base",
        lg: "sm:px-8 sm:py-4 sm:text-lg",
        full: "w-full sm:px-6 sm:py-4 sm:text-base",
    };

    return (
        <button
            type={type}
            className={`${color} text-white font-bold rounded-lg transition shadow-lg cursor-pointer px-4 py-2 text-xs ${sizeClasses[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900`}
            onClick={onClick}
            disabled={disabled}
        >
            {children || text}
        </button>
    )
}