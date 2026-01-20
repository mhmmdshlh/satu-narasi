import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVoteYea } from "@fortawesome/free-solid-svg-icons"
import { BaseBox } from "../../components/BaseBox"
import { SurveyItem } from "./SurveyItem"
import { Btn } from "../../components/Button"
import { CommentBox } from "./CommentBox"

export const SurveyForm = () => {
    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Survei Prioritas Isu Jabar</h2>
            <p className="text-gray-700 mb-6 text-lg">Bantu kami memahami isu apa yang paling penting menurut Anda untuk
                Jawa Barat</p>

            <form id="survey-form">
                <div className="space-y-4 mb-6">
                    <SurveyItem title="Infrastruktur & Transportasi" description="Jalan, jembatan, transportasi publik" votes={0} id="infra-input" />
                    <SurveyItem title="Pendidikan" description="Kualitas sekolah, akses pendidikan, beasiswa" votes={0} id="edu-input" />
                    <SurveyItem title="Kesehatan" description="Fasilitas kesehatan, tenaga medis, BPJS" votes={0} id="health-input" />
                    <SurveyItem title="Lingkungan & Kebersihan" description="Pengelolaan sampah, ruang terbuka hijau, polusi" votes={0} id="env-input" />
                    <SurveyItem title="Ekonomi & Ketenagakerjaan" description="Lapangan kerja, UMKM, investasi" votes={0} id="economy-input" />
                </div>

                <div className="mb-6">
                    <CommentBox />
                </div>

                <Btn color="bg-red-gradient px-8 py-4" onClick={() => { }}>
                    <FontAwesomeIcon icon={faVoteYea} className="mr-2" />Submit Suara Saya
                </Btn>
            </form>
        </BaseBox >
    )
}
