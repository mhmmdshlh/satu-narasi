import { useEffect, useState } from "react";
import { getApprovedReports } from "../../services/civiclab/report.service";

const CATEGORY_LABEL = {
    infrastruktur: "Infrastruktur",
    pendidikan: "Pendidikan",
    kesehatan: "Kesehatan",
    lingkungan: "Lingkungan",
    ekonomi: "Ekonomi",
    sosial: "Sosial",
};

export const ReportsModal = ({ onClose }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getApprovedReports()
            .then(setReports)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Tutup modal saat klik backdrop
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-xl font-black text-gray-900">Laporan Warga Disetujui</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
                    {loading ? (
                        <p className="text-gray-500 text-sm text-center py-8">Memuat laporan...</p>
                    ) : reports.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-8">Belum ada laporan yang disetujui.</p>
                    ) : (
                        reports.map((report) => (
                            <div key={report.id} className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-start justify-between gap-3 flex-wrap">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{report.title}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {CATEGORY_LABEL[report.category] ?? report.category} · {report.location}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {new Date(report.created_at).toLocaleDateString("id-ID", {
                                            day: "numeric", month: "short", year: "numeric"
                                        })}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{report.description}</p>
                                {report.image_url && (
                                    <img
                                        src={report.image_url}
                                        alt="Foto laporan"
                                        className="mt-3 h-30 object-cover rounded-lg border border-gray-200"
                                    />
                                )}
                                <p className="text-xs text-gray-400 mt-2">
                                    Oleh: {report.author?.full_name ?? report.author?.username ?? "Anonim"}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
