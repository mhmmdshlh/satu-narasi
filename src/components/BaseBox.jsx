export const BaseBox = ({ children }) => {
    return (
        <section className="p-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    {children}
                </div>
            </div>
        </section>
    )
}
