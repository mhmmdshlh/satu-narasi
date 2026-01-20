import PageHeader from "../components/PageHeader"
import { Dashboard } from "../features/civiclab/Dashboard"
import { PolicyBrief } from "../features/civiclab/PolicyBrief"
import { ReportForm } from "../features/civiclab/ReportForm"

export const Civiclab = () => {
    return (
        <>
            <PageHeader
                title="CivicLab"
                description="Laporkan jalan rusak, banjir, atau isu sosial di sekitarmu"
            />
            <Dashboard />
            <ReportForm />
            <PolicyBrief />
        </>
    )
}
