import { faChartLine, faCity, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons"
import { StatCard } from "../../features/civiclab/StatCard"
import { BaseBox } from "../../components/BaseBox"
import { useEffect, useState } from "react"
import { getStatJabar } from "../../services/civiclab/dashboard.service.js"

export const Dashboard = () => {
    const [statJabar, setStatJabar] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStatJabar();
            setStatJabar(data);
            console.log("Fetched statJabar:", data);
        };

        fetchData();
    }, []);

    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Dashboard Data Jawa Barat Tahun {statJabar ? statJabar.tahun : '...'}</h2>
            <div className="grid md:grid-cols-4 gap-6">
                <StatCard
                    variant="red"
                    icon={faUsers}
                    title={statJabar ? (statJabar.jml_penduduk / 1000000).toFixed(2) + " Juta" : '...'}
                    description="Jumlah Penduduk"
                />
                <StatCard
                    variant="gray"
                    icon={faCity}
                    title={statJabar ? (statJabar.jml_kabkota) : '...'}
                    description="Kab/Kota"
                />
                <StatCard
                    variant="red"
                    icon={faChartLine}
                    title={statJabar ? `${statJabar.pertumbuhan_ekonomi}%` : '...'}
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
