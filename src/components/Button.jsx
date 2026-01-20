export const Btn = ({ text, children, onClick, color }) => {
    return (
        <button
            className={`${color} text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition shadow-lg cursor-pointer`}
            onClick={onClick}
        >
            {children || text}
        </button>
    )
}
