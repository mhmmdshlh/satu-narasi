import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BaseCard } from "../../components/BaseCard"

export const StatCard = ({ icon, title, description, variant, onClick }) => {
    return (
        <BaseCard variant={variant} onClick={onClick} clickable={!!onClick}>
            <FontAwesomeIcon icon={icon} className={`mb-2 text-3xl ${variant === 'red' ? 'text-red-600' : 'text-gray-600'}`} />
            <h3 className="font-black text-gray-900 text-2xl">{title}</h3>
            <p className="text-base text-gray-700 font-medium">{description}</p>
            {onClick && <p className="text-xs text-gray-400 mt-2">Klik untuk lihat detail</p>}
        </BaseCard>
    )
}
