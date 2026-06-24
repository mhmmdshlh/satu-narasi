const PageSkeleton = () => (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 mt-16">
        <div className="text-center">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Memuat...</p>
        </div>
    </div>
)

export default PageSkeleton