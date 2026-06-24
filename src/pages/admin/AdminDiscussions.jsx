import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllDiscussions, getAllComments } from "../../services/admin/admin.service"
import { deleteDiscussion } from "../../services/forum/forum.service"
import { deleteComment } from "../../services/forum/forum.service"

export const AdminDiscussions = () => {
    const [expanded, setExpanded] = useState(null);
    const queryClient = useQueryClient();

    const { data: discussions = [], isLoading } = useQuery({
        queryKey: ['admin', 'discussions'],
        queryFn: getAllDiscussions,
    });

    // comments and commentsLoading now declared above with the loading skeleton

    const deleteDiscussionMutation = useMutation({
        mutationFn: deleteDiscussion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'discussions'] });
        },
        onError: () => alert("Gagal menghapus diskusi."),
    });

    const deleteCommentMutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'comments', expanded] });
        },
        onError: () => alert("Gagal menghapus komentar."),
    });

    const handleDeleteDiscussion = (id) => {
        if (!window.confirm("Hapus diskusi ini? Semua komentar juga akan terhapus.")) return;
        deleteDiscussionMutation.mutate(id);
    };

    const handleViewComments = (discussionId) => {
        if (expanded === discussionId) {
            setExpanded(null);
            return;
        }
        setExpanded(discussionId);
    };

    const handleDeleteComment = (id) => {
        if (!window.confirm("Hapus komentar ini?")) return;
        deleteCommentMutation.mutate(id);
    };

    const { data: comments = [], isLoading: commentsLoading } = useQuery({
        queryKey: ['admin', 'comments', expanded],
        queryFn: () => getAllComments(expanded),
        enabled: !!expanded,
    });

    if (isLoading) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="h-9 bg-gray-200 rounded w-64 mb-6" />
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-xl shadow p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                            <div className="flex-1 min-w-0 w-full">
                                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <div className="h-8 bg-gray-200 rounded w-20" />
                                <div className="h-8 bg-gray-200 rounded w-16" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">Forum &mdash; Semua Diskusi</h1>

            {discussions.length === 0 ? (
                <p className="text-gray-500">Belum ada diskusi.</p>
            ) : (
                <div className="space-y-4">
                    {discussions.map((disc) => (
                        <div key={disc.id} className="bg-white rounded-xl shadow">
                            <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-3">
                                <div className="flex-1 min-w-0 w-full sm:w-auto">
                                    <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{disc.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                        {disc.category} &middot; Oleh: {disc.author_username || "Anonim"} &middot; {disc.likes_count || 0} likes &middot; {disc.comment_count || 0} komentar
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-1">{disc.content}</p>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto sm:ml-4 shrink-0">
                                    <button onClick={() => handleViewComments(disc.id)}
                                        className="flex-1 sm:flex-none px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer">
                                        Komentar
                                    </button>
                                    <button onClick={() => handleDeleteDiscussion(disc.id)}
                                        className="flex-1 sm:flex-none px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer">
                                        Hapus
                                    </button>
                                </div>
                            </div>

                            {expanded === disc.id && (
                                <div className="border-t border-gray-100 p-4 sm:p-6 space-y-3">
                                    <h4 className="font-bold text-gray-700 text-sm sm:text-base">Komentar {commentsLoading ? '' : `(${comments.length})`}</h4>
                                    {commentsLoading ? (
                                        <div className="space-y-3 animate-pulse">
                                            {[1, 2].map(i => (
                                                <div key={i} className="bg-gray-50 rounded-lg p-3">
                                                    <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                                                    <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                                                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : comments.length === 0 ? (
                                        <p className="text-sm text-gray-500">Belum ada komentar.</p>
                                    ) : (
                                        comments.map((c) => (
                                            <div key={c.id} className="flex items-start justify-between bg-gray-50 rounded-lg p-3">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-gray-900">{c.author?.username || "Anonim"}</p>
                                                    <p className="text-sm text-gray-600">{c.content}</p>
                                                </div>
                                                <button onClick={() => handleDeleteComment(c.id)}
                                                    className="text-red-500 hover:text-red-600 text-sm font-semibold cursor-pointer shrink-0 ml-4">
                                                    Hapus
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDiscussions