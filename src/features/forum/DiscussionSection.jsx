import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { getDiscussions } from "../../services/forum/forum.service"
import { DiscussionForm } from "./DiscussionForm"
import { DiscussionCard } from "./DiscussionCard"
import { BaseBox } from "../../components/BaseBox"
import { Btn } from "../../components/Button"

export const DiscussionSection = () => {
    const { user } = useAuth();
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadDiscussions();
    }, []);

    const loadDiscussions = async () => {
        try {
            const data = await getDiscussions();
            setDiscussions(data);
        } catch (error) {
            console.error("Error loading discussions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDiscussionCreated = () => {
        setShowForm(false);
        loadDiscussions();
    };

    return (
        <BaseBox>
            {user && (
                <div className="mb-6">
                    {!showForm ? (
                        <Btn text="+ Create New Discussion" onClick={() => setShowForm(true)} color="bg-red-500 hover:bg-red-600 py-3" />
                    ) : (
                        <DiscussionForm
                            onSuccess={handleDiscussionCreated}
                            onCancel={() => setShowForm(false)}
                        />
                    )}
                </div>
            )}

            {/* List Discussions */}
            {loading ? (
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
