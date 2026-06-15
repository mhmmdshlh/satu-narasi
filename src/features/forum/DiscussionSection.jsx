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
                <div className="text-center py-8">
                    <p className="text-gray-600">Loading discussions...</p>
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