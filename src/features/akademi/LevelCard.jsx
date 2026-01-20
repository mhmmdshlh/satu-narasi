import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BaseCard } from "../../components/BaseCard"

export const LevelCard = ({ variant, icon, title, description }) => {
    return (
        <BaseCard variant={variant}>
            <div className="flex flex-col items-center text-center gap-3 w-37">
                <FontAwesomeIcon icon={icon} className="mb-2 text-5xl text-red-500" />
                <h3 className="font-black text-gray-900 text-lg">{title}</h3>
                <p className="text-base text-gray-700 font-medium">{description}</p>
            </div>
        </BaseCard>
    )
} 
