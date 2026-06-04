import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Logo } from "../components/Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

const AdminLayout = () => {
    const { profile } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen bg-gray-100 md:flex">
            {/* Mobile Top Bar */}
            <div className="md:hidden bg-gray-900 text-white px-4 h-16 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
                <Logo />
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white hover:text-red-500 p-2"
                    aria-label={sidebarOpen ? "Tutup menu" : "Buka menu"}
                >
                    <FontAwesomeIcon icon={sidebarOpen ? faXmark : faBars} size="2x" />
                </button>
            </div>

            {/* Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col
                transform transition-transform duration-200 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 md:shrink-0
            `}>
                <div className="hidden md:block p-6 border-b border-gray-700">
                    <Logo />
                </div>
                <nav className="flex-1 p-4 space-y-1 pt-20 md:pt-4">
                    <NavLink to="/admin" end onClick={closeSidebar}
                        className={({ isActive }) => `block px-4 py-2 rounded-lg font-semibold transition ${isActive ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/reports" onClick={closeSidebar}
                        className={({ isActive }) => `block px-4 py-2 rounded-lg font-semibold transition ${isActive ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                        Laporan Warga
                    </NavLink>
                    <NavLink to="/admin/discussions" onClick={closeSidebar}
                        className={({ isActive }) => `block px-4 py-2 rounded-lg font-semibold transition ${isActive ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                        Forum
                    </NavLink>
                    <div className="pt-4 mt-4 border-t border-gray-700">
                        <NavLink to="/" onClick={closeSidebar}
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

            {/* Main Content */}
            <main className="flex-1 overflow-auto pt-16 md:pt-0">
                <div className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout