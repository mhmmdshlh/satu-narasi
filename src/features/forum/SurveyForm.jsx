import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { BaseBox } from "../../components/BaseBox";
import { SurveyItem } from "./SurveyItem";
import { getIssues, getUserVote, handleVoteCount } from "../../services/forum/forum.service";

export const SurveyForm = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [error, setError] = useState(null);

    const { data: issues = [] } = useQuery({
        queryKey: ['issues'],
        queryFn: getIssues,
    });

    const { data: selectedIssueId = null } = useQuery({
        queryKey: ['userVote'],
        queryFn: getUserVote,
        enabled: !!user,
    });

    const voteMutation = useMutation({
        mutationFn: (issueId) => handleVoteCount(issueId),
        onMutate: async (issueId) => {
            await queryClient.cancelQueries({ queryKey: ['issues'] });
            await queryClient.cancelQueries({ queryKey: ['userVote'] });

            const previousIssues = queryClient.getQueryData(['issues']);
            const previousVote = queryClient.getQueryData(['userVote']);

            queryClient.setQueryData(['issues'], (old = []) =>
                old.map(issue => {
                    if (issue.id === issueId && previousVote !== issueId) {
                        return { ...issue, total_votes: (issue.total_votes || 0) + 1 };
                    }
                    if (issue.id === previousVote) {
                        return { ...issue, total_votes: Math.max(0, (issue.total_votes || 0) - 1) };
                    }
                    return issue;
                })
            );

            queryClient.setQueryData(['userVote'], issueId === previousVote ? null : issueId);

            return { previousIssues, previousVote };
        },
        onError: (err, issueId, context) => {
            if (context?.previousIssues) {
                queryClient.setQueryData(['issues'], context.previousIssues);
            }
            if (context?.previousVote !== undefined) {
                queryClient.setQueryData(['userVote'], context.previousVote);
            }
            setError("Gagal menyimpan vote.");
            console.error(err);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            queryClient.invalidateQueries({ queryKey: ['userVote'] });
        },
        onSuccess: () => {
            setError(null);
        },
    });

    const handleVote = (issueId) => {
        if (!user) {
            setError("Kamu harus login untuk voting.");
            return;
        }
        setError(null);
        voteMutation.mutate(issueId);
    };

    return (
        <BaseBox>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Survei Prioritas Isu Jabar</h2>
            <p className="text-gray-700 mb-6 text-base sm:text-lg">
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