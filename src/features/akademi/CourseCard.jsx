import { faClock, faUsers } from "@fortawesome/free-solid-svg-icons"
import { Btn } from "../../components/Button"
import { ContentCard } from "../../components/ContentCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const CourseCard = ({ icon, title, description, level, duration, students }) => {
    const levelColors = {
        "Pemula": "bg-red-100 text-red-600",
        "Menengah": "bg-gray-200 text-gray-700",
        "Lanjutan": "bg-amber-200 text-amber-700"
    }

    return (
        <ContentCard padding={false}>
            <div className="bg-red-gradient h-40 flex items-center justify-center">
                <FontAwesomeIcon icon={icon} className="text-white text-5xl" />
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <span
                        className={`${levelColors[level]} px-3 py-1 rounded-full text-sm font-black`}>{level}</span>
                    <span className="text-gray-600 font-semibold"><FontAwesomeIcon icon={faClock} className="mr-1" />{duration}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 font-semibold"><FontAwesomeIcon icon={faUsers} className="mr-1" />{students}   Peserta</span>
                </div>
                <Btn text="Daftar Sekarang" color="bg-red-gradient w-full" onClick={() => { }} />
            </div>
        </ContentCard>
    )
}
