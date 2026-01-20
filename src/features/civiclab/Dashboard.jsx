import { faChartLine, faCity, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons"
import { StatCard } from "../../features/civiclab/StatCard"
import { BaseBox } from "../../components/BaseBox"

export const Dashboard = () => {
    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Dashboard Data Jawa Barat</h2>
            <div className="grid md:grid-cols-4 gap-6">
                <StatCard
                    variant="red"
                    icon={faUsers}
                    title="15 Juta+"
                    description="Jumlah Penduduk"
                />
                <StatCard
                    variant="gray"
                    icon={faCity}
                    title="27"
                    description="Kab/Kota"
                />
                <StatCard
                    variant="red"
                    icon={faChartLine}
                    title="5.2%"
                    description="Pertumbuhan Ekonomi"
                />
                <StatCard
                    variant="gray"
                    icon={faFileAlt}
                    title="0"
                    description="Laporan Warga"
                />
            </div>
        </BaseBox>
    )
}
