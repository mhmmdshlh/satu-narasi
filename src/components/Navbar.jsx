import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="bg-gray-900 fixed top-0 w-full h-18 px-15 sm:px-30 lg:px-40 flex justify-between items-center z-50">
            <div className="shrink-0">
                <span className="text-xl font-medium text-white">SATU<span
                    className="font-bold text-red-500">NARASI</span></span>
            </div>
            <div className="space-x-8">
                <NavLink to="/" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Beranda</NavLink>
                <NavLink to="/civiclab" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>CivicLab</NavLink>
                <NavLink to="/akademi" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Akademi</NavLink>
                <NavLink to="/forum" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Forum</NavLink>
            </div>
            <button id="mobile-menu-btn" className="md:hidden text-white hover:text-red-500">
                <i className="fas fa-bars text-2xl"></i>
            </button>

            {/* Mobile Menu */}
            <div id="mobile-menu" className="hidden md:hidden bg-gray-800 border-t border-gray-700">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <NavLink to="/" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} block px-3 py-2 hover:bg-gray-700 rounded`}>Beranda</NavLink>
                    <NavLink to="/civiclab" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} block px-3 py-2 hover:bg-gray-700 rounded`}>CivicLab</NavLink>
                    <NavLink to="/akademi" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} block px-3 py-2 hover:bg-gray-700 rounded`}>Akademi</NavLink>
                    <NavLink to="/forum" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} block px-3 py-2 hover:bg-gray-700 rounded`}>Forum</NavLink>
                </div>
            </div>
        </nav >
    )
}
