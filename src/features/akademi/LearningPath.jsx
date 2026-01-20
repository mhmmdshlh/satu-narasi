import { BaseBox } from "../../components/BaseBox"
import { LevelCard } from "./LevelCard"
import { faBook, faBullseye, faChartBar, faTrophy } from "@fortawesome/free-solid-svg-icons"

export const LearningPath = () => {
    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Learning Path</h2>
            <p className="text-gray-700 text-center mb-8 text-lg">Jalur pembelajaran terstruktur untuk menjadi ahli
                kebijakan publik</p>
            <div className="flex flex-row items-center justify-between gap-2">
                <LevelCard
                    variant="red"
                    icon={faBook}
                    title="Level 1: Dasar"
                    description="4 Modul - 20 Jam"
                />
                <span className="text-4xl text-red-500 font-black">→</span>
                <LevelCard
                    variant="gray"
                    icon={faChartBar}
                    title="Level 2: Analisis"
                    description="6 Modul - 30 Jam"
                />
                <span className="text-4xl text-red-500 font-black">→</span>
                <LevelCard
                    variant="red"
                    icon={faBullseye}
                    title="Level 3: Praktik"
                    description="8 Modul - 40 Jam"
                />
                <span className="text-4xl text-red-500 font-black">→</span>
                <LevelCard
                    variant="gray"
                    icon={faTrophy}
                    title="Sertifikasi"
                    description="Project Final"
                />
            </div>
        </BaseBox>
    )
}
