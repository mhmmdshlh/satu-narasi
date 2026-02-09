import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faHeart, faEye, faComment, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { getDiscussion, getComments, toggleLike, getUserLike, createComment, updateDiscussion, deleteDiscussion, incrementDiscussionViews } from "../services/forum/forum.service"
import { CommentBox } from "../features/forum/CommentBox"
import { useAuth } from "../contexts/AuthContext"
import { CategoryTag } from "../components/CategoryTag"

export const DiscussionDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [discussion, setDiscussion] = useState(null);
    const [comments, setComments] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editCategory, setEditCategory] = useState("");

    // Load data discussion, comments, dan user like status
    useEffect(() => {
        loadDiscussion();
        loadComments();
        if (user) loadUserLike();
    }, [id, user]);

    // Increment view - hanya 1x per user per discussion (ditrack di database)
    useEffect(() => {
        if (user) {
            incrementDiscussionViews(id).catch(console.error);
        }
    }, [id, user]);

    const loadDiscussion = async () => {
        try {
            const data = await getDiscussion(id);
            setDiscussion(data);
            setEditTitle(data.title);
            setEditContent(data.content);
            setEditCategory(data.category);
        } catch (error) {
            console.error("Error loading discussion:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadComments = async () => {
        try {
            const data = await getComments(id);
            setComments(data || []);
        } catch (error) {
            console.error("Error loading comments:", error);
            setComments([]);
        }
    };

    const loadUserLike = async () => {
        try {
            const liked = await getUserLike(id);
            setHasLiked(liked);
        } catch (error) {
            console.error("Error loading user like:", error);
        }
    };

    const handleLike = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            const liked = await toggleLike(id);
            setHasLiked(liked);
            await loadDiscussion(); // Reload untuk update like count
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate("/login");
            return;
        }

        if (!commentText.trim()) return;

        setSubmitting(true);
        try {
            await createComment({
                discussion_id: id,
                content: commentText
            });
            setCommentText("");
            await loadComments();
        } catch (error) {
            console.error("Error creating comment:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditDiscussion = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await updateDiscussion(id, {
                title: editTitle,
                content: editContent,
                category: editCategory
            });
            await loadDiscussion();
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating discussion:", error);
            alert("Failed to update discussion");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteDiscussion = async () => {
        if (!window.confirm("Are you sure you want to delete this discussion? This action cannot be undone.")) {
            return;
        }

        try {
            await deleteDiscussion(id);
            navigate("/forum");
        } catch (error) {
            console.error("Error deleting discussion:", error);
            alert("Failed to delete discussion");
        }
    };

    const handleCommentDeleted = () => {
        loadComments();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-center text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!discussion) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-center text-gray-600">Discussion not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Link to="/forum" className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 mb-6 font-semibold">
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Forum
            </Link>

            {/* Discussion Content */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                {isEditing ? (
                    /* Edit Form */
                    <form onSubmit={handleEditDiscussion}>
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    disabled={submitting}
                                >
                                    <option value="Umum">Umum</option>
                                    <option value="Pertanyaan">Pertanyaan</option>
                                    <option value="Infrastruktur">Infrastruktur</option>
                                    <option value="Pendidikan">Pendidikan</option>
                                    <option value="Lingkungan">Lingkungan</option>
                                    <option value="Kesehatan">Kesehatan</option>
                                    <option value="Ekonomi">Ekonomi</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                    disabled={submitting}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    rows="8"
                                    required
                                    disabled={submitting}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
                                disabled={submitting}
                            >
                                {submitting ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditTitle(discussion.title);
                                    setEditContent(discussion.content);
                                    setEditCategory(discussion.category);
                                }}
                                className="px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
                                disabled={submitting}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <CategoryTag category={discussion.category} />
                                {discussion.is_pinned && (
                                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-yellow-100 text-yellow-600">
                                        📌 Pinned
                                    </span>
                                )}
                            </div>

                            {/* Edit/Delete Buttons - Only show if user is author */}
                            {user && user.id === discussion.author_id && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDeleteDiscussion}
                                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        <h1 className="text-3xl font-black text-gray-900 mb-4">{discussion.title}</h1>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                            <span className="font-semibold">
                                By {discussion.author_username || discussion.author_full_name || 'Anonymous'}
                            </span>
                            <span>•</span>
                            <span>{formatDate(discussion.created_at)}</span>
                            <span>•</span>
                            <span><FontAwesomeIcon icon={faEye} className="mr-1" />{discussion.views} views</span>
                        </div>

                        <div className="prose max-w-none mb-6">
                            <p className="text-gray-800 whitespace-pre-wrap">{discussion.content}</p>
                        </div>

                        {/* Like Button */}
                        <div className="flex items-center gap-4 border-t pt-4">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                                    hasLiked
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                disabled={!user}
                            >
                                <FontAwesomeIcon icon={faHeart} className={hasLiked ? 'text-white' : ''} />
                                {hasLiked ? 'Liked' : 'Like'}
                            </button>
                            <span className="font-bold text-lg text-gray-700">{discussion.likes_count || 0} likes</span>
                        </div>
                    </>
                )}
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                    {comments.length} Comments
                </h3>

                {/* Comment Form */}
                {
                    user ? (
                        <form onSubmit={handleCommentSubmit} className="mb-8">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Write a comment..."
                                rows="4"
                                disabled={submitting}
                            />
                            <button
                                type="submit"
                                className="mt-3 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
                                disabled={submitting || !commentText.trim()}
                            >
                                {submitting ? "Posting..." : "Post Comment"}
                            </button>
                        </form>
                    ) : (
                        <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center">
                            <p className="text-gray-600">
                                <Link to="/login" className="text-red-500 font-semibold hover:underline">Login</Link> to post a comment
                            </p>
                        </div>
                    )
                }

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.length === 0 ? (
                        <p className="text-center text-gray-600 py-8">No comments yet. Be the first to comment!</p>
                    ) : (
                        comments.map(comment => (
                            <CommentBox
                                key={comment.id}
                                comment={comment}
                                currentUser={user}
                                onCommentDeleted={handleCommentDeleted}
                            />
                        ))
                    )}
                </div>
            </div >
        </div >
    );
};
