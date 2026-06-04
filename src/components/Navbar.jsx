import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Logo } from "./Logo.jsx"
import { useAuth } from "../hooks/useAuth.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

export const Navbar = () => {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        const confirmed = window.confirm("Apakah kamu yakin ingin logout?");
        if (!confirmed) return;
        await signOut();
        navigate("/");
        setMobileMenuOpen(false);
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav className="bg-gray-900 fixed top-0 w-full h-16 sm:h-18 px-4 sm:px-10 lg:px-30 flex justify-between items-center z-50">
            <div className="shrink-0">
                <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
                <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Beranda</NavLink>
                <NavLink to="/civiclab" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>CivicLab</NavLink>
                <NavLink to="/akademi" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Akademi</NavLink>
                <NavLink to="/forum" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Forum</NavLink>

                {(profile?.role === "admin" || profile?.role === "super_admin") && (
                    <NavLink to="/admin" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Admin</NavLink>
                )}

                {user ? (
                    <div className="inline-flex items-center gap-3">
                        <span className="text-white text-sm font-medium hidden sm:block">
                            {profile?.username}
                        </span>
                        <button
                            onClick={handleLogout}
                            className='font-semibold bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <NavLink to="/login" onClick={closeMobileMenu} className='font-semibold bg-white px-4 py-2 rounded-md hover:opacity-90'>Sign in</NavLink>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white hover:text-red-500 p-2"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={mobileMenuOpen}
            >
                <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} size="2x" />
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-lg z-40 animate-slide-down">
                    <div className="px-4 pt-4 pb-6 space-y-3">
                        <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} block px-4 py-3 rounded-lg hover:bg-gray-800 transition`}>Beranda</NavLink>
                        <NavLink to="/civiclab" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} block px-4 py-3 rounded-lg hover:bg-gray-800 transition`}>CivicLab</NavLink>
                        <NavLink to="/akademi" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} block px-4 py-3 rounded-lg hover:bg-gray-800 transition`}>Akademi</NavLink>
                        <NavLink to="/forum" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} block px-4 py-3 rounded-lg hover:bg-gray-800 transition`}>Forum</NavLink>

                        {(profile?.role === "admin" || profile?.role === "super_admin") && (
                            <NavLink to="/admin" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} block px-4 py-3 rounded-lg hover:bg-gray-800 transition`}>Admin</NavLink>
                        )}

                        <div className="pt-4 border-t border-gray-700">
                            {user ? (
                                <div className="space-y-3">
                                    <span className="block text-white text-sm font-medium">
                                        {profile?.username}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className='w-full text-left font-semibold bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 transition'
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <NavLink to="/login" onClick={closeMobileMenu} className='block font-semibold bg-white px-4 py-3 rounded-md hover:opacity-90 text-center text-gray-900'>Sign in</NavLink>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav >
    )
}