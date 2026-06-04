import { useNavigate } from "react-router-dom"
import { Btn } from "../../components/Button"

export const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="pt-20 w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto p-12 sm:p-16 lg:p-30 bg-red-gradient rounded-2xl sm:rounded-3xl text-white">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
                    Data → Narasi → Advokasi
                </h1>
                <p className="text-sm sm:text-xl md:text-2xl mb-8 font-medium leading-relaxed mx-auto">
                    Platform kolaborasi warga Jawa Barat untuk kebijakan publik yang lebih baik.
                </p>
                <Btn text="Baca Selengkapnya" color="bg-gray-900 hover:bg-gray-800" size="lg" onClick={() => navigate("/#about")} />
            </div>
        </section>
    )
}