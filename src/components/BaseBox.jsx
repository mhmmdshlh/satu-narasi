export const BaseBox = ({ children }) => {
    return (
        <section className="p-4 sm:p-6 lg:p-8">
            <div className="sm:max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-6 lg:p-8">
                    {children}
                </div>
            </div>
        </section>
    )
}
