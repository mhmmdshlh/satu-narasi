import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ContentCard } from "../../components/ContentCard"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export const PolicyCard = ({ title, description, category }) => {
    return (
        <ContentCard>
            <div className="text-sm text-red-500 font-black mb-2">{category}</div>
            <h4 className="text-xl font-black text-gray-900 mb-3">{title}</h4>
            <p className="text-gray-700 mb-4">{description}</p>
            <button className="text-red-500 font-bold hover:text-red-600 cursor-pointer">
                Baca Selengkapnya <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
            </button>
        </ContentCard>
    )
}
