import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { BaseBox } from "../../components/BaseBox";
import { getUserReports, submitReport } from "../../services/civiclab/report.service";

const STATUS_LABEL = {
    pending: { text: "Menunggu Persetujuan", cls: "bg-yellow-100 text-yellow-700" },
    approved: { text: "Disetujui", cls: "bg-green-100 text-green-700" },
    rejected: { text: "Ditolak", cls: "bg-red-100 text-red-700" },
};

const CATEGORIES = [
    { value: "infrastruktur", label: "Infrastruktur" },
    { value: "pendidikan", label: "Pendidikan" },
    { value: "kesehatan", label: "Kesehatan" },
    { value: "lingkungan", label: "Lingkungan" },
    { value: "ekonomi", label: "Ekonomi & Ketenagakerjaan" },
    { value: "sosial", label: "Sosial" },
];

export const ReportForm = () => {
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [reports, setReports] = useState([]);
    const fileInputRef = useRef(null);

    const loadReports = async () => {
        if (!user) return;
        try {
            const data = await getUserReports();
            setReports(data);
        } catch (err) {
            console.error("Gagal memuat laporan:", err);
        }
    };

    useEffect(() => {
        loadReports();
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("Ukuran foto maksimal 5MB.");
            e.target.value = "";
            return;
        }

        setError(null);
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setLocation("");
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setSubmitting(true);
        try {
            await submitReport({ title, description, category, location, imageFile });
            setSuccess(true);
            resetForm();
            await loadReports();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Forum Laporan Warga</h2>

            {/* Form hanya untuk user yang login */}
            {!user ? (
                <div className="p-5 rounded-xl border-2 border-dashed border-gray-300 text-center text-gray-500 mb-8">
                    <p className="font-semibold mb-1">Login untuk mengirim laporan</p>
                    <p className="text-sm">Kamu perlu login terlebih dahulu untuk melaporkan isu di sekitarmu.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="mb-10">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                            Laporan berhasil dikirim! Laporan akan ditinjau sebelum dipublikasikan.
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-bold mb-2">Judul Laporan</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Contoh: Jalan Berlubang"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
                                required
                                disabled={submitting}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Kategori</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
                                required
                                disabled={submitting}
                            >
                                <option value="">Pilih Kategori</option>
                                {CATEGORIES.map((c) => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Lokasi</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="RT/RW, Blok, Desa, Kec, Kab/Kota"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
                                required
                                disabled={submitting}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-bold mb-2">Deskripsi Laporan</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
                                rows="4"
                                placeholder="Jelaskan detail isu yang kamu laporkan..."
                                required
                                disabled={submitting}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-bold mb-2">
                                Foto Pendukung <span className="text-gray-400 font-normal">(opsional)</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer"
                                disabled={submitting}
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="mt-3 h-40 rounded-lg object-cover border border-gray-200" />
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Mengirim..." : "Kirim Laporan"}
                    </button>
                </form>
            )}

            {/* Daftar laporan milik user */}
            {user && reports.length > 0 && (
                <div>
                    <h3 className="text-xl font-black text-gray-800 mb-4">Laporan Kamu</h3>
                    <div className="space-y-4">
                        {reports.map((report) => {
                            const status = STATUS_LABEL[report.status] ?? STATUS_LABEL.pending;
                            return (
                                <div key={report.id} className="border-2 border-gray-200 rounded-xl p-5">
                                    <div className="flex items-start justify-between gap-4 flex-wrap">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{report.title}</h4>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {report.category} · {report.location}
                                            </p>
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${status.cls}`}>
                                            {status.text}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-3 line-clamp-2">{report.description}</p>
                                    {report.image_url && (
                                        <img src={report.image_url} alt="Foto laporan" className="mt-3 h-36 rounded-lg object-cover border border-gray-200" />
                                    )}
                                    <p className="text-xs text-gray-400 mt-3">
                                        {new Date(report.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </BaseBox>
    );
};

