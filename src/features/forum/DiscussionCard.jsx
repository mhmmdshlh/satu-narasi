import { ContentCard } from "../../components/ContentCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faThumbsUp, faEye } from "@fortawesome/free-solid-svg-icons"

export const DiscussionCard = ({ title, author, date, category, excerpt, likes, comments, views, color }) => {
    return (
        <ContentCard>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-black ${color}`}>{category}</span>
                        <span className="text-gray-500 font-semibold text-sm">{date}</span>
                    </div>
                    <h4 className="text-xl font-black text-gray-900 mb-2">{title}</h4>
                    <p className="text-gray-700 mb-4">{excerpt}</p>
                    <div className="flex items-center gap-6 text-gray-600 font-semibold">
                        <span><FontAwesomeIcon icon={faComment} className="mr-2" />{comments} Komentar</span>
                        <span><FontAwesomeIcon icon={faThumbsUp} className="mr-2" />{likes} Suka</span>
                        <span><FontAwesomeIcon icon={faEye} className="mr-2" />{views} Views</span>
                    </div>
                </div>
            </div>
        </ContentCard>
    )
}
