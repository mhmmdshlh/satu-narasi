import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { getDiscussions } from "../../services/forum/forum.service"
import { DiscussionForm } from "./DiscussionForm"
import { DiscussionCard } from "./DiscussionCard"
import { BaseBox } from "../../components/BaseBox"
import { Btn } from "../../components/Button"

export const DiscussionSection = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);

    const { data: discussions = [], isLoading } = useQuery({
        queryKey: ['discussions'],
        queryFn: () => getDiscussions(),
    });

    const handleDiscussionCreated = () => {
        setShowForm(false);
        queryClient.invalidateQueries({ queryKey: ['discussions'] });
    };

    const skeletonCards = [1, 2, 3];

    return (
        <BaseBox>
            {user && (
                <div className="mb-6">
                    {!showForm ? (
                        <Btn text="+ Create New Discussion" onClick={() => setShowForm(true)} color="bg-red-500 hover:bg-red-600" size="lg" className="w-full sm:w-auto" />
                    ) : (
                        <DiscussionForm
                            onSuccess={handleDiscussionCreated}
                            onCancel={() => setShowForm(false)}
                        />
                    )}
                </div>
            )}

            {isLoading ? (
                <div className="flex flex-col gap-2 animate-pulse">
                    {skeletonCards.map(i => (
                        <div key={i} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-7 aspect-square bg-gray-200 rounded-full" />
                                <div className="h-4 bg-gray-200 rounded w-24" />
                                <span className="text-gray-200 font-bold">|</span>
                                <div className="h-4 bg-gray-200 rounded w-16" />
                            </div>
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                            <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                            <div className="flex gap-4 sm:gap-6">
                                <div className="h-4 bg-gray-200 rounded w-16" />
                                <div className="h-4 bg-gray-200 rounded w-20" />
                                <div className="h-4 bg-gray-200 rounded w-14" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : discussions.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No discussions yet. Be the first to start one!</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {discussions.map(discussion => (
                        <DiscussionCard key={discussion.id} discussion={discussion} />
                    ))}
                </div>
            )}
        </BaseBox>
    )
}