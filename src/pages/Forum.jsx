import PageHeader from "../components/PageHeader"
import { DiscussionForm } from "../features/forum/DiscussionForm"
import { SurveyForm } from "../features/forum/SurveyForm"

export const Forum = () => {
    return (
        <>
            <PageHeader
                title="Suara Warga"
                description="Diskusikan isu terkini bersama komunitas dan ahli"
            />
            <DiscussionForm />
            <SurveyForm />
        </>
    )
}
