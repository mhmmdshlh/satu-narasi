import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { getAdminStats } from "../../services/admin/admin.service"
import { faUsers, faFileAlt, faComments, faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const AdminDashboard = () => {
    const { profile } = useAuth();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin', 'stats'],
        queryFn: getAdminStats,
    });

    if (isLoading) {
        return <p className="text-gray-600">Memuat data...</p>;
    }

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Dashboard Admin</h1>
            <p className="text-gray-500 mb-6 sm:mb-8">Selamat datang, {profile?.full_name || profile?.username}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <StatCard icon={faUsers} title={stats.totalUsers} description="Total Pengguna" variant="red" />
                <StatCard icon={faFileAlt} title={stats.totalReports} description="Total Laporan" variant="gray" />
                <StatCard icon={faClipboardList} title={stats.totalDiscussions} description="Total Diskusi" variant="red" />
                <StatCard icon={faComments} title={stats.totalComments} description="Total Komentar" variant="gray" />
            </div>

            <h2 className="text-lg sm:text-xl font-black text-gray-900 mt-8 sm:mt-10 mb-4">Status Laporan Warga</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-6 rounded-xl">
                    <p className="text-2xl sm:text-3xl font-black text-yellow-700">{stats.pendingReports}</p>
                    <p className="text-sm sm:text-base text-yellow-700 font-medium">Laporan Pending</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 sm:p-6 rounded-xl">
                    <p className="text-2xl sm:text-3xl font-black text-green-700">{stats.approvedReports}</p>
                    <p className="text-sm sm:text-base text-green-700 font-medium">Laporan Disetujui</p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-xl col-span-2 sm:col-span-1">
                    <p className="text-2xl sm:text-3xl font-black text-red-700">{stats.rejectedReports}</p>
                    <p className="text-sm sm:text-base text-red-700 font-medium">Laporan Ditolak</p>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, description, variant }) => (
    <div className={`p-4 sm:p-6 rounded-xl ${variant === 'red' ? 'bg-red-50 border-l-4 border-red-500' : 'bg-gray-50 border-l-4 border-gray-500'}`}>
        <FontAwesomeIcon icon={icon} className={`mb-2 text-2xl sm:text-3xl ${variant === 'red' ? 'text-red-600' : 'text-gray-600'}`} />
        <p className="text-2xl sm:text-3xl font-black text-gray-900">{title}</p>
        <p className="text-sm sm:text-base text-gray-700 font-medium">{description}</p>
    </div>
);