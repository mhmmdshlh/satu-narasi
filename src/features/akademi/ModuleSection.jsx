import { BaseBox } from "../../components/BaseBox"
import { ModuleCard } from "./ModuleCard"

export const ModeleSection = () => {
    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Modul Populer</h2>
            <div className="space-y-4">
                <ModuleCard title="Membaca dan Memahami APBD Daerah" description="Pelajari cara membaca dokumen APBD dan memahami alokasi anggaran pemerintah daerah." color="red" duration="2 Jam" category="APBD" />
                <ModuleCard title="Hak dan Kewajiban Warga Negara" description="Pahami hak-hak Anda sebagai warga negara dan cara menggunakannya secara efektif." color="gray" duration="1.5 Jam" category="HAK WARGA" />
                <ModuleCard title="Strategi Advokasi Kebijakan Efektif" description="Teknik dan strategi untuk mempengaruhi kebijakan publik melalui advokasi yang terorganisir." color="red" duration="3 Jam" category="ADVOKASI" />
            </div>
        </BaseBox>
    )
}
