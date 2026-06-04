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
            <div className="bg-red-gradient h-24 sm:h-40 flex items-center justify-center">
                <FontAwesomeIcon icon={icon} className="text-white text-2xl sm:text-5xl" />
            </div>
            <div className="p-3 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span
                        className={`${levelColors[level]} px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-black`}>{level}</span>
                    <span className="text-xs sm:text-base text-gray-600 font-semibold"><FontAwesomeIcon icon={faClock} className="mr-1" />{duration}</span>
                </div>
                <h3 className="text-sm sm:text-xl font-black text-gray-900 mb-2 sm:mb-3">{title}</h3>
                <p className="text-xs sm:text-base text-gray-700 mb-2 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-3">{description}</p>
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-xs sm:text-base text-gray-700 font-semibold"><FontAwesomeIcon icon={faUsers} className="mr-1" />{students}   Peserta</span>
                </div>
                <Btn text="Daftar Sekarang" color="bg-red-gradient w-full" size="sm" onClick={() => { }} />
            </div>
        </ContentCard>
    )
}