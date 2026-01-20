import { faBookOpen, faChartBar, faUsersCog } from "@fortawesome/free-solid-svg-icons"
import { BaseBox } from "../../components/BaseBox"
import { CourseCard } from "./CourseCard"

export const CourseSection = () => {
    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Kursus Tersedia</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <CourseCard icon={faBookOpen} title="Pengantar Kebijakan Publik" description="Memahami dasar-dasar kebijakan publik, proses pembuatan kebijakan publik, dan analisis stakeholder." level="Pemula" duration="4 Minggu" students="152" />

                <CourseCard icon={faChartBar} title="Analisis Data untuk Kebijakan" description="Belajar menggunakan data untuk menganalisis masalah publik dan merumuskan rekomendasi kebijakan." level="Menengah" duration="6 Minggu" students="152" />

                <CourseCard icon={faUsersCog} title="Advokasi & Partisipasi Publik" description="Strategi membangun gerakan advokasi dan meningkatkan partisipasi masyarakat dalam kebijakan." level="Lanjutan" duration="8 Minggu" students="76" />
            </div>
        </BaseBox>
    )
}
