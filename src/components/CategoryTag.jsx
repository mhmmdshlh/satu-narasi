export const CategoryTag = ({ category }) => {
    let colors = {
        Umum: "bg-gray-200 text-gray-800",
        Pertanyaan: "bg-blue-100 text-blue-600",
        Infrastruktur: "bg-red-100 text-red-600",
        Pendidikan: "bg-green-100 text-green-600",
        Lingkungan: "bg-emerald-100 text-emerald-600",
        Kesehatan: "bg-purple-100 text-purple-600",
        Ekonomi: "bg-yellow-100 text-yellow-600",
        Pemula: "bg-red-100 text-red-600",
        Menengah: "bg-gray-100 text-gray-600",
        Lanjutan: "bg-amber-100 text-amber-600",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors[category] || colors.Umum}`}>
            {category}
        </span>
    )
}
