export const BaseCard = ({ variant, children, onClick, clickable }) => {
    const variantClasses = {
        red: "bg-linear-to-br from-red-50 to-red-100 border-l-4 border-red-500",
        gray: "bg-linear-to-br from-gray-50 to-gray-100 border-l-4 border-gray-500",
    };

    return (
        <div
            className={`${variantClasses[variant]} p-6 rounded-xl ${clickable ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition' : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
