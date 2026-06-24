import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faEye, faComment, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { getDiscussion, getComments, getUserLike, toggleLike, createComment, updateDiscussion, deleteDiscussion, incrementDiscussionViews } from "../services/forum/forum.service"
import { CommentBox } from "../features/forum/CommentBox"
import { useAuth } from "../hooks/useAuth"
import { CategoryTag } from "../components/CategoryTag"
import { BackButton } from "../components/BackButton"

export const DiscussionDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [commentText, setCommentText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editCategory, setEditCategory] = useState("");

    const { data: discussion, isLoading } = useQuery({
        queryKey: ['discussion', id],
        queryFn: () => getDiscussion(id),
    });

    const { data: comments = [] } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => getComments(id),
    });

    const { data: hasLiked = false } = useQuery({
        queryKey: ['userLike', id],
        queryFn: () => getUserLike(id),
        enabled: !!user,
    });

    useEffect(() => {
        if (user && id) {
            incrementDiscussionViews(id).catch(console.error);
        }
    }, [id, user]);

    const likeMutation = useMutation({
        mutationFn: () => toggleLike(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['discussion', id] });
            queryClient.invalidateQueries({ queryKey: ['userLike', id] });
        },
    });

    const commentMutation = useMutation({
        mutationFn: () => createComment({ discussion_id: id, content: commentText }),
        onSuccess: () => {
            setCommentText("");
            queryClient.invalidateQueries({ queryKey: ['comments', id] });
        },
    });

    const editMutation = useMutation({
        mutationFn: () => updateDiscussion(id, { title: editTitle, content: editContent, category: editCategory }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['discussion', id] });
            setIsEditing(false);
        },
        onError: () => {
            alert("Failed to update discussion");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteDiscussion(id),
        onSuccess: () => navigate("/forum"),
        onError: () => {
            alert("Failed to delete discussion");
        },
    });

    const handleLike = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        likeMutation.mutate();
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            navigate("/login");
            return;
        }
        if (!commentText.trim()) return;
        commentMutation.mutate();
    };

    const handleEditDiscussion = (e) => {
        e.preventDefault();
        editMutation.mutate();
    };

    const handleDeleteDiscussion = () => {
        if (!window.confirm("Are you sure you want to delete this discussion? This action cannot be undone.")) return;
        deleteMutation.mutate();
    };

    const handleCommentDeleted = () => {
        queryClient.invalidateQueries({ queryKey: ['comments', id] });
    };

    const startEditing = () => {
        setEditTitle(discussion.title);
        setEditContent(discussion.content);
        setEditCategory(discussion.category);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditTitle(discussion.title);
        setEditContent(discussion.content);
        setEditCategory(discussion.category);
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

    const isSubmitting = likeMutation.isPending || commentMutation.isPending || editMutation.isPending;

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 mt-16 animate-pulse">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-7 bg-gray-200 rounded w-28" />
                        <div className="h-7 bg-gray-200 rounded w-32" />
                    </div>
                    <div className="h-9 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="flex gap-4 mb-6">
                        <div className="h-5 bg-gray-200 rounded w-32" />
                        <div className="h-5 bg-gray-200 rounded w-44" />
                        <div className="h-5 bg-gray-200 rounded w-24" />
                    </div>
                    <div className="space-y-3 mb-6">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-4/6" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                    <div className="flex gap-4 border-t pt-4">
                        <div className="h-10 bg-gray-200 rounded w-24" />
                        <div className="h-10 bg-gray-200 rounded w-20" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
                    <div className="h-8 bg-gray-200 rounded w-36 mb-6" />
                    <div className="space-y-4">
                        {[1, 2].map(i => (
                            <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
                                        <div className="h-3 bg-gray-200 rounded w-16" />
                                    </div>
                                </div>
                                <div className="ml-14 space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-full" />
                                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-6">
                {isEditing ? (
                    <form onSubmit={handleEditDiscussion}>
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                {editMutation.isPending ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                type="button"
                                onClick={cancelEditing}
                                className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
                                disabled={isSubmitting}
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
                            </div>
                            <BackButton to="/forum" label="Back to Forum" />
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">{discussion.title}</h1>

                        <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-4 text-sm text-gray-600 mb-6">
                            <span className="font-semibold">
                                By {discussion.author_username || discussion.author_full_name || 'Anonymous'}
                            </span>
                            <span className="hidden sm:inline">&bull;</span>
                            <span className="w-full sm:w-auto">{formatDate(discussion.created_at)}</span>
                            <span>&bull;</span>
                            <span><FontAwesomeIcon icon={faEye} className="mr-1" />{discussion.views} views</span>
                        </div>

                        <div className="prose max-w-none mb-6">
                            <p className="text-gray-800 whitespace-pre-wrap">{discussion.content}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t pt-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition ${hasLiked
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    disabled={!user}
                                >
                                    <FontAwesomeIcon icon={faHeart} className={hasLiked ? 'text-white' : ''} />
                                    {hasLiked ? 'Liked' : 'Like'}
                                </button>
                                <span className="font-bold text-base sm:text-lg text-gray-700">{discussion.likes_count || 0} likes</span>
                            </div>

                            {user && user.id === discussion.author_id && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={startEditing}
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
                    </>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">
                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                    {comments.length} Comments
                </h3>

                {user ? (
                    <form onSubmit={handleCommentSubmit} className="mb-8">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Write a comment..."
                            rows="4"
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto mt-3 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
                            disabled={isSubmitting || !commentText.trim()}
                        >
                            {commentMutation.isPending ? "Posting..." : "Post Comment"}
                        </button>
                    </form>
                ) : (
                    <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center">
                        <p className="text-gray-600">
                            <Link to="/login" className="text-red-500 font-semibold hover:underline">Login</Link> to post a comment
                        </p>
                    </div>
                )}

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
            </div>
        </div>
    );
};

export default DiscussionDetail