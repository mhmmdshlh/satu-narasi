const AkademiSkeleton = () => (
    <div className="animate-pulse min-h-[calc(100vh-4rem)]">
        <section className="pt-24 pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-200 text-white py-10 sm:py-12 px-6 sm:px-8 rounded-2xl sm:rounded-3xl">
                    <div className="h-8 sm:h-10 bg-gray-300 rounded w-1/2 mb-4" />
                    <div className="h-5 bg-gray-300 rounded w-3/4" />
                </div>
            </div>
        </section>
        <section className="pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
                    <div className="h-7 sm:h-8 bg-gray-200 rounded w-1/3 mb-6" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                                <div className="bg-gray-200 h-24 sm:h-40" />
                                <div className="p-3 sm:p-6 space-y-2 sm:space-y-3">
                                    <div className="flex justify-between">
                                        <div className="h-5 bg-gray-200 rounded w-14" />
                                        <div className="h-5 bg-gray-200 rounded w-16" />
                                    </div>
                                    <div className="h-5 bg-gray-200 rounded w-full" />
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                                    <div className="h-5 bg-gray-200 rounded w-24" />
                                    <div className="h-8 bg-gray-200 rounded w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        <section className="pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
                    <div className="h-7 sm:h-8 bg-gray-200 rounded w-1/3 mx-auto mb-2" />
                    <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto mb-8" />
                    <div className="flex flex-row items-center gap-1 sm:gap-2 overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="border-2 border-gray-200 rounded-xl p-4 sm:p-6 w-28 sm:w-40 shrink-0">
                                <div className="flex flex-col items-center gap-1 sm:gap-3">
                                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-200 rounded" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                        <div className="h-4 w-4 bg-gray-200 rounded shrink-0" />
                    </div>
                </div>
            </div>
        </section>
        <section className="pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
                    <div className="h-7 sm:h-8 bg-gray-200 rounded w-1/3 mb-6" />
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="border-2 border-gray-200 rounded-xl p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex gap-2">
                                            <div className="h-5 bg-gray-200 rounded w-16" />
                                            <div className="h-5 bg-gray-200 rounded w-14" />
                                        </div>
                                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-full" />
                                    </div>
                                    <div className="h-8 bg-gray-200 rounded w-16 shrink-0" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
)

export default AkademiSkeleton