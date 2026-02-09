import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faHeart, faEye } from "@fortawesome/free-solid-svg-icons"
import { CategoryTag } from "../../components/CategoryTag";

export const DiscussionCard = ({ discussion }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} menit yang lalu`;
        if (diffHours < 24) return `${diffHours} jam yang lalu`;
        if (diffDays < 7) return `${diffDays} hari yang lalu`;
        return date.toLocaleDateString('id-ID');
    };

    const excerpt = discussion.content.length > 150
        ? discussion.content.substring(0, 150) + "..."
        : discussion.content;

    return (
        <Link to={`/forum/${discussion.id}`}>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 text-sm">
                            <div className="flex-1 flex items-center gap-3">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <div className="w-7 aspect-square shrink-0 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs leading-none">
                                        {discussion.author_username ? discussion.author_username[0].toUpperCase() : (discussion.author_full_name ? discussion.author_full_name[0].toUpperCase() : 'A')}
                                    </div>
                                    <span className="font-semibold leading-none">{discussion.author_username || discussion.author_full_name || 'Anonymous'}</span>
                                </div>
                                <span className="text-gray-600 font-bold">|</span>
                                <span className="text-gray-500 font-semibold">
                                    {formatDate(discussion.created_at)}
                                </span>
                            </div>
                            <CategoryTag category={discussion.category} />
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-2">{discussion.title}</h4>
                        <p className="text-gray-700 mb-3">{excerpt}</p>

                        <div className="flex items-center gap-6 text-gray-600 font-semibold text-sm">
                            <span>
                                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                                {discussion.likes_count || 0} Likes
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faComment} className="mr-2" />
                                {discussion.comment_count || 0} Comments
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                {discussion.views || 0} Views
                            </span>
                        </div>
                    </div>
                </div>
            </div >
        </Link >
    );
};
