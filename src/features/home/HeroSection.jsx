import { useNavigate } from "react-router-dom"
import { Btn } from "../../components/Button"

export const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="pt-16 w-full min-h-screen flex flex-col justify-center items-center text-center px-4">
            <div className="mx-auto p-30 bg-red-gradient rounded-3xl text-white">
                <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                    Data → Narasi → Advokasi
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-medium">
                    Platform kolaborasi warga Jawa Barat untuk kebijakan publik yang lebih baik.
                </p>
                <Btn text="Baca Selengkapnya" color="bg-gray-900 py-3" onClick={() => navigate("/#about")} />
            </div>
        </section>
    )
}
