import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { BaseBox } from "../../components/BaseBox"
import { Btn } from "../../components/Button"
import { DiscussionCard } from "./DiscussionCard"

export const DiscussionForm = () => {
    return (
        <BaseBox>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-gray-900">Forum Diskusi</h2>
                <Btn color="bg-red-gradient py-3" onClick={() => { }}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Buat Diskusi Baru
                </Btn>
            </div>
            <div className="space-y-4" id="forum-threads">
                <DiscussionCard
                    title="Optimalisasi Jalur Kereta Api di Bandung Raya"
                    author="Admin"
                    date="2 jam yang lalu"
                    category="Infrastruktur"
                    excerpt="Bagaimana pendapat Anda tentang rencana pembangunan jalur kereta api yang menghubungkan Bandung dengan daerah sekitarnya?"
                    comments={24}
                    likes={89}
                    views={342}
                    color="bg-red-100 text-red-600"
                />
                <DiscussionCard
                    title="Akses Pendidikan Berkualitas di Daerah Terpencil"
                    author="Admin"
                    date="5 jam yang lalu"
                    category="Pendidikan"
                    excerpt="Diskusi tentang strategi meningkatkan kualitas pendidikan di daerah terpencil Jawa Barat."
                    comments={18}
                    likes={56}
                    views={218}
                    color="bg-gray-200 text-gray-700"
                />
                <DiscussionCard
                    title="Pengelolaan Sampah di Kota Besar"
                    author="Admin"
                    date="1 hari yang lalu"
                    category="Lingkungan"
                    excerpt="Bagaimana kita bisa mengatasi masalah sampah yang semakin menumpuk di kota-kota besar Jawa Barat?"
                    comments={42}
                    likes={123}
                    views={567}
                    color="bg-red-100 text-red-600"
                />
            </div>
        </BaseBox>
    )
}
