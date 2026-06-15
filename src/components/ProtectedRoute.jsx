import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user, profile, loading, profileLoading } = useAuth()
    const location = useLocation()

    if (loading || profileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">Memuat...</p>
            </div>
        )
    }

    if (!user || !allowedRoles.includes(profile?.role)) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children
}

export default ProtectedRoute