import { NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Logo } from "../components/Logo"

const AdminLayout = () => {
    const { profile } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
                <div className="p-6 border-b border-gray-700">
                    <Logo />
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <NavLink to="/admin" end
                        className={({ isActive }) => `block px-4 py-2 rounded-lg font-semibold transition ${isActive ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/reports"
                        className={({ isActive }) => `block px-4 py-2 rounded-lg font-semibold transition ${isActive ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                        Laporan Warga
                    </NavLink>
                    <NavLink to="/admin/discussions"
                        className={({ isActive }) => `block px-4 py-2 rounded-lg font-semibold transition ${isActive ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                        Forum
                    </NavLink>
                    <div className="pt-4 mt-4 border-t border-gray-700">
                        <NavLink to="/"
                            className="block px-4 py-2 rounded-lg font-semibold text-gray-300 hover:bg-gray-800 transition">
                            &larr; Kembali ke Situs
                        </NavLink>
                    </div>
                </nav>
                <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
                    {profile?.username && <p>Login sebagai: <span className="font-semibold text-white">{profile.username}</span></p>}
                    <p className="capitalize">Role: {profile?.role || '\u2014'}</p>
                </div>
            </aside>
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout
