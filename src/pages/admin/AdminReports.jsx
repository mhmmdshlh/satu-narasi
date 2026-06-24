import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllReports, approveReport, rejectReport } from "../../services/admin/admin.service"

const STATUS_LABEL = {
    pending: { text: "Pending", cls: "bg-yellow-100 text-yellow-700" },
    approved: { text: "Disetujui", cls: "bg-green-100 text-green-700" },
    rejected: { text: "Ditolak", cls: "bg-red-100 text-red-700" },
};

export const AdminReports = () => {
    const [filter, setFilter] = useState(null);
    const queryClient = useQueryClient();

    const { data: reports = [], isLoading } = useQuery({
        queryKey: ['admin', 'reports', { status: filter }],
        queryFn: () => getAllReports(filter),
    });

    const approveMutation = useMutation({
        mutationFn: approveReport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] });
        },
    });

    const rejectMutation = useMutation({
        mutationFn: rejectReport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] });
        },
    });

    const handleApprove = (id) => {
        if (!window.confirm("Setujui laporan ini?")) return;
        approveMutation.mutate(id);
    };

    const handleReject = (id) => {
        if (!window.confirm("Tolak laporan ini?")) return;
        rejectMutation.mutate(id);
    };

    const filters = [
        { value: null, label: "Semua" },
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Disetujui" },
        { value: "rejected", label: "Ditolak" },
    ];

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">Laporan Warga</h1>

            <div className="flex flex-wrap gap-2 mb-6">
                {filters.map((f) => (
                    <button
                        key={f.label}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${filter === f.value ? 'bg-red-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-xl shadow p-4 sm:p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                                <div className="h-6 bg-gray-200 rounded w-20 shrink-0" />
                            </div>
                            <div className="mt-3 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                            </div>
                            <div className="h-32 bg-gray-200 rounded-lg mt-3" />
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="h-4 bg-gray-200 rounded w-48" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : reports.length === 0 ? (
                <p className="text-gray-500">Belum ada laporan.</p>
            ) : (
                <div className="space-y-4">
                    {reports.map((report) => {
                        const status = STATUS_LABEL[report.status];
                        return (
                            <div key={report.id} className="bg-white rounded-xl shadow p-4 sm:p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{report.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                            {report.category} &middot; {report.location}
                                        </p>
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0 ${status.cls}`}>
                                        {status.text}
                                    </span>
                                </div>
                                <p className="text-sm sm:text-base text-gray-600 mt-3 line-clamp-2">{report.description}</p>
                                {report.image_url && (
                                    <img src={report.image_url} alt="Foto" className="mt-3 h-32 rounded-lg object-cover border" />
                                )}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-400">
                                        Oleh: {report.author?.username || "Anonim"} &middot; {new Date(report.created_at).toLocaleDateString("id-ID")}
                                    </p>
                                    {report.status === "pending" && (
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <button onClick={() => handleApprove(report.id)}
                                                className="flex-1 sm:flex-none px-4 py-1.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer text-sm">
                                                Setujui
                                            </button>
                                            <button onClick={() => handleReject(report.id)}
                                                className="flex-1 sm:flex-none px-4 py-1.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer text-sm">
                                                Tolak
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminReports