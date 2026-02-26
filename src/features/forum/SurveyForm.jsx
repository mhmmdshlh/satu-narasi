import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { BaseBox } from "../../components/BaseBox";
import { SurveyItem } from "./SurveyItem";
import { getIssues, getUserVote, handleVoteCount } from "../../services/forum/forum.service";

export const SurveyForm = () => {
    const { user } = useAuth();
    const [issues, setIssues] = useState([]);
    const [selectedIssueId, setSelectedIssueId] = useState(null);
    const [error, setError] = useState(null);

    // Fetch issues + user's current vote
    const loadData = async () => {
        try {
            const [issuesData, userVote] = await Promise.all([
                getIssues(),
                user ? getUserVote() : null,
            ]);
            setIssues(issuesData);
            setSelectedIssueId(userVote);
        } catch (err) {
            setError("Gagal memuat data survei.");
            console.error(err);
        }
    };

    useEffect(() => {
        loadData();
    }, [user]);

    const handleVote = async (issueId) => {
        if (!user) {
            setError("Kamu harus login untuk voting.");
            return;
        }

        const prevIssues = issues;
        const prevSelectedId = selectedIssueId;

        setIssues(prev => prev.map(issue => {
            if (issue.id === issueId && selectedIssueId !== issueId) {
                return { ...issue, total_votes: issue.total_votes + 1 };
            }
            if (issue.id === selectedIssueId) {
                return { ...issue, total_votes: issue.total_votes - 1 };
            }
            return issue;
        }));
        setSelectedIssueId(selectedIssueId === issueId ? null : issueId);

        try {
            setError(null);
            await handleVoteCount(issueId);
        } catch (err) {
            setIssues(prevIssues);
            setSelectedIssueId(prevSelectedId);
            setError("Gagal menyimpan vote.");
            console.error(err);
        }
    };

    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Survei Prioritas Isu Jabar</h2>
            <p className="text-gray-700 mb-6 text-lg">
                Bantu kami memahami isu apa yang paling penting menurut Anda untuk Jawa Barat
            </p>

            {error && (
                <p className="text-red-500 mb-4 text-sm">{error}</p>
            )}

            <form id="survey-form">
                <div className="space-y-4 mb-6 select-none">
                    {issues.map((issue) => (
                        <SurveyItem
                            key={issue.id}
                            id={issue.id}
                            title={issue.issue_name}
                            description={issue.issue_description}
                            votes={issue.total_votes}
                            checked={selectedIssueId === issue.id}
                            onChange={handleVote}
                        />
                    ))}
                </div>
                {!user && (
                    <p className="text-sm text-gray-500 mt-2">Login untuk ikut voting.</p>
                )}
            </form>
        </BaseBox>
    );
};
