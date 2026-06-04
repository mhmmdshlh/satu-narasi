import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BaseCard } from "../../components/BaseCard"

export const LevelCard = ({ variant, icon, title, description }) => {
    return (
        <BaseCard variant={variant}>
            <div className="flex flex-col items-center text-center gap-1 sm:gap-3 w-28 sm:w-40 shrink-0">
                <FontAwesomeIcon icon={icon} className="text-2xl sm:text-5xl text-red-500" />
                <h3 className="font-black text-gray-900 text-xs sm:text-lg">{title}</h3>
                <p className="text-xs sm:text-base text-gray-700 font-medium">{description}</p>
            </div>
        </BaseCard>
    )
} 