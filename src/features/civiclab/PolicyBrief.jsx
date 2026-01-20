import { BaseBox } from "../../components/BaseBox"
import { PolicyCard } from "./PolicyCard"

export const PolicyBrief = () => {
    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Policy Brief</h2>
            <div className="grid md:grid-cols-2 gap-6" id="policy-briefs">
                <PolicyCard title="Pengembangan Transportasi Publik Jabar" description="Analisis dan rekomendasi untuk meningkatkan aksesibilitas transportasi publik di seluruh Jawa Barat." category="INFRASTRUKTUR" />
                <PolicyCard title="Digitalisasi Pendidikan Pasca Pandemi" description="Strategi implementasi pembelajaran digital yang inklusif dan efektif untuk semua kalangan." category="PENDIDIKAN" />
            </div>
        </BaseBox>
    )
}
