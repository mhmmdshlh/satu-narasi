import { NavLink, useNavigate } from "react-router-dom"
import { Logo } from "./Logo.jsx"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useEffect, useState } from "react"
import { getProfile } from "../services/profile/profile.service.js"

export const Navbar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            // Fetch profile data saat user login
            getProfile(user.id)
                .then(setProfile)
                .catch(console.error);
        } else {
            setProfile(null);
        }
    }, [user]);

    const handleLogout = async () => {
        await signOut();
        navigate("/");
    };

    return (
        <nav className="bg-gray-900 fixed top-0 w-full h-18 px-15 sm:px-30 lg:px-30 flex justify-between items-center z-50">
            <div className="shrink-0">
                <Logo />
            </div>
            <div className="space-x-8">
                <NavLink to="/" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Beranda</NavLink>
                <NavLink to="/civiclab" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>CivicLab</NavLink>
                <NavLink to="/akademi" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Akademi</NavLink>
                <NavLink to="/forum" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"} hover:text-red-500 font-semibold transition`}>Forum</NavLink>

                {user ? (
                    <div className="inline-flex items-center gap-3">
                        <span className="text-white text-sm font-medium">
                            {profile?.username}
                        </span>
                        <button
                            onClick={handleLogout}
                            className='font-semibold bg-red-500 text-white p-2.5 px-4 rounded-md hover:bg-red-600 transition'
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <NavLink to="/login" className='font-semibold bg-white p-2.5 px-4 rounded-md hover:opacity-90'>Sign in</NavLink>
                )}
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
