import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateComment, deleteComment } from "../../services/forum/forum.service";

export const CommentBox = ({ comment, currentUser, onCommentDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [submitting, setSubmitting] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} menit yang lalu`;
        if (diffHours < 24) return `${diffHours} jam yang lalu`;
        if (diffDays < 7) return `${diffDays} hari yang lalu`;
        return date.toLocaleDateString('id-ID');
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await updateComment(comment.id, editContent);
            comment.content = editContent; // Update local state
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating comment:", error);
            alert("Failed to update comment");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }

        try {
            await deleteComment(comment.id);
            if (onCommentDeleted) onCommentDeleted();
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("Failed to delete comment");
        }
    };

    const isAuthor = currentUser && currentUser.id === comment.author_id;

    // Fallback untuk handle jika author null
    const authorName = comment.author?.username || comment.author?.full_name || 'Anonymous';
    const authorInitial = authorName[0].toUpperCase();

    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {authorInitial}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">
                            {authorName}
                        </p>
                        <p className="text-sm text-gray-600">{formatDate(comment.created_at)}</p>
                    </div>
                </div>

                {/* Edit/Delete Buttons - Only show if user is author */}
                {isAuthor && !isEditing && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded font-semibold transition"
                        >
                            <FontAwesomeIcon icon={faEdit} className="mr-1" />
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded font-semibold transition"
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-1" />
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="ml-13 mt-2">
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows="3"
                        required
                        disabled={submitting}
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            type="submit"
                            className="bg-red-500 text-white px-4 py-1 rounded font-semibold hover:bg-red-600 transition disabled:opacity-50 text-sm"
                            disabled={submitting}
                        >
                            {submitting ? "Saving..." : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setEditContent(comment.content);
                            }}
                            className="px-4 py-1 border border-gray-300 rounded font-semibold hover:bg-gray-100 transition text-sm"
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-gray-800 ml-13 whitespace-pre-wrap">{comment.content}</p>
            )}
        </div>
    );
};
