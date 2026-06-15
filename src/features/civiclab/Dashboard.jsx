import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { faChartLine, faCity, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons"
import { StatCard } from "../../features/civiclab/StatCard"
import { BaseBox } from "../../components/BaseBox"
import { getStatJabar } from "../../services/civiclab/dashboard.service.js"
import { getTotalApprovedReports } from "../../services/civiclab/report.service.js"
import { ReportsModal } from "./ReportsModal.jsx"
import { BaseCard } from "../../components/BaseCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);

    const { data: statJabar } = useQuery({
        queryKey: ['civiclab', 'stats'],
        queryFn: getStatJabar,
    });

    const { data: totalReports = 0 } = useQuery({
        queryKey: ['civiclab', 'totalApprovedReports'],
        queryFn: getTotalApprovedReports,
    });

    return (
        <>
            <BaseBox>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 sm:mb-6">Dashboard Jabar Tahun {statJabar ? statJabar.tahun : '2025'}</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard
                        variant="red"
                        icon={faUsers}
                        title={statJabar ? (statJabar.jml_penduduk / 1000000).toFixed(2) + " Juta" : '50.76 Juta'}
                        description="Jumlah Penduduk"
                    />
                    <StatCard
                        variant="gray"
                        icon={faCity}
                        title={statJabar ? (statJabar.jml_kabkota) : '27'}
                        description="Kab/Kota"
                    />
                    <StatCard
                        variant="red"
                        icon={faChartLine}
                        title={statJabar ? `${statJabar.pertumbuhan_ekonomi}%` : '5.20%'}
                        description="Pertumbuhan Ekonomi"
                    />
                    <BaseCard variant="gray" onClick={() => setShowModal(true)} clickable>
                        <div className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faFileAlt} className="mb-2 text-2xl sm:text-3xl text-gray-600" />
                            <h3 className="font-black text-gray-900 text-xl sm:text-2xl">{totalReports}</h3>
                        </div>
                        <p className="text-base text-gray-700 font-medium">Laporan Disetujui</p>
                        <p className="text-xs text-gray-400 mt-2">Klik untuk lihat detail</p>
                    </BaseCard>
                </div>
            </BaseBox>

            {showModal && <ReportsModal onClose={() => setShowModal(false)} />}
        </>
    )
}