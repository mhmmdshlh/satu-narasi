import { BaseBox } from "../../components/BaseBox"

export const ReportForm = () => {
    return (
        <BaseBox>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Forum Laporan Warga</h2>
            <form id="report-form" className="mb-8">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Nama</label>
                        <input type="text" id="report-name"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
                            required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Kategori</label>
                        <select id="report-category"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
                            required>
                            <option value="">Pilih Kategori</option>
                            <option value="infrastruktur">Infrastruktur</option>
                            <option value="pendidikan">Pendidikan</option>
                            <option value="kesehatan">Kesehatan</option>
                            <option value="lingkungan">Lingkungan</option>
                            <option value="ekonomi">Ekonomi</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Lokasi</label>
                    <input type="text" id="report-location"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
                        placeholder="Desa, Kecamatan, Kabupaten/Kota" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Deskripsi Laporan</label>
                    <textarea id="report-description"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
                        rows="4" required></textarea>
                </div>
                <button type="submit"
                    className="bg-red-gradient text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition shadow-lg cursor-pointer">
                    <i className="fas fa-paper-plane mr-2"></i>Kirim Laporan
                </button>
            </form>
            <div id="reports-list" className="space-y-4">
                {/* Reports will be dynamically added here */}
            </div>
        </BaseBox>
    )
}
