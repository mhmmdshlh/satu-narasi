import PageHeader from "../components/PageHeader"
import { SurveyForm } from "../features/forum/SurveyForm"
import { DiscussionSection } from "../features/forum/DiscussionSection"

export const Forum = () => {
    return (
        <>
            <PageHeader
                title="Suara Warga"
                description="Diskusikan isu terkini bersama komunitas dan ahli"
            />
            <DiscussionSection />
            <SurveyForm />
        </>
    )
}
