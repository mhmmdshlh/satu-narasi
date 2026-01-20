import PageHeader from "../components/PageHeader"
import { CourseSection } from "../features/akademi/CourseSection"
import { LearningPath } from "../features/akademi/LearningPath"
import { ModeleSection } from "../features/akademi/ModuleSection"

export const Akademi = () => {
    return (
        <>
            <PageHeader
                title="Akademi Kebijakan"
                description="Belajar cara membaca APBD dan memahami hak warga negara"
            />
            <CourseSection />
            <LearningPath />
            <ModeleSection />
        </>
    )
}
