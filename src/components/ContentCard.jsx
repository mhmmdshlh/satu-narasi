export const ContentCard = ({ children, padding = true }) => {
    return (
        <div className={`border-2 border-gray-200 rounded-xl overflow-hidden hover:border-red-500 hover:shadow-lg transition ${padding ? "p-6" : ""}`}>
            {children}
        </div>
    )
}
