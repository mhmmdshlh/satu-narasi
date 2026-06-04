import { ContentCard } from "../../components/ContentCard"
import { Btn } from "../../components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"

export const ModuleCard = ({ title, description, color, duration, category }) => {
    const colorClasses = {
        red: ["bg-red-100 text-red-600", "bg-red-gradient"],
        gray: ["bg-gray-200 text-gray-700", "bg-red-gradient"]
    }

    return (
        <ContentCard>
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                        <span
                            className={`${colorClasses[color][0]} px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-black`}>{category}</span>
                        <span className="text-xs sm:text-base text-gray-600 font-semibold"><FontAwesomeIcon icon={faClock} className="mr-1" />{duration}</span>
                    </div>
                    <h4 className="text-base sm:text-xl font-black text-gray-900 mb-1 sm:mb-2">{title}</h4>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-2 sm:line-clamp-none">{description}</p>
                </div>
                <span className="shrink-0">
                    <Btn color={colorClasses[color][1]} text="Mulai" size="sm" />
                </span>
            </div>
        </ContentCard>
    )
}
