export const CommentBox = () => {
    return (
        <>
            <label className="block text-gray-900 font-black mb-2 text-lg">Komentar Tambahan (Opsional)</label>
            <textarea
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
                rows="3" placeholder="Bagikan pemikiran Anda..."></textarea>
        </>
    )
}
