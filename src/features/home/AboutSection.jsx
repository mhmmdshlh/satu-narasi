import gedungSateImg from "../../assets/gedung-sate.jpg";

export const AboutSection = () => {
    return (
        <section className="py-16 bg-white scroll-mt-10" id="about">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-red-500 mb-6">Apa itu SatuNarasi?</h2>
                    <figure className="max-w-2xl mx-auto mb-6">
                        <img src={gedungSateImg} alt="Gedung Sate Bandung"
                            className="w-full h-50 object-cover rounded-lg border-l-7 border-r-7 border-red-500 px-1" />
                        <figcaption className="text-[.75rem] text-gray-400 italic text-center">
                            Sumber foto: <a
                                href="https://unsplash.com/photos/a-large-white-building-with-a-tall-tower-yE0uCV_oOBc"
                                className="hover:text-red-500" target="_blank" rel="noopener noreferrer">
                                Unsplash
                            </a>
                        </figcaption>
                    </figure>
                    <div className="max-w-4xl mx-auto text-center px-4 text-sm sm:text-lg">
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            SatuNarasi adalah platform kolaborasi digital yang menghubungkan warga Jawa Barat dengan
                            pembuat kebijakan publik. Kami percaya bahwa kebijakan yang baik lahir dari data yang akurat,
                            narasi yang kuat, dan advokasi yang efektif.
                        </p>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Melalui tiga pilar utama: <span className="font-semibold text-red-600">CivicLab</span> untuk
                            pelaporan
                            masalah publik, <span className="font-semibold text-red-600">Akademi</span> untuk pembelajaran
                            kebijakan,
                            dan <span className="font-semibold text-red-600">Forum</span> untuk diskusi kolaboratif. Kami
                            memberdayakan masyarakat untuk berpartisipasi aktif dalam pembangunan daerah.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Bergabunglah dengan ribuan warga Jawa Barat lainnya dalam menciptakan perubahan positif
                            untuk masa depan yang lebih baik.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
