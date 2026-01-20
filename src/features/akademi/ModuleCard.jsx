import { ContentCard } from "../../components/ContentCard"
import { Btn } from "../../components/Button"

export const ModuleCard = ({ title, description, color, duration, category }) => {
    const colorClasses = {
        red: ["bg-red-100 text-red-600", "bg-red-gradient"],
        gray: ["bg-gray-200 text-gray-700", "bg-gray-800"]
    }

    return (
        <ContentCard>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span
                            className={`${colorClasses[color][0]} px-3 py-1 rounded-full text-sm font-black`}>{category}</span>
                        <span className="text-gray-600 font-semibold"><i className="fas fa-clock mr-1"></i>{duration}</span>
                    </div>
                    <h4 className="text-xl font-black text-gray-900 mb-2">{title}</h4>
                    <p className="text-gray-700">{description}</p>
                </div>
                <Btn color={colorClasses[color][1]} text="Mulai" />
            </div>
        </ContentCard>
    )
}
