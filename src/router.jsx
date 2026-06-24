import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import LazyPage from "./components/LazyPage"
import { Home } from "./pages/Home"
import MainLayout from "./layouts/MainLayout"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import AdminLayout from "./layouts/AdminLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import AkademiSkeleton from "./features/akademi/AkademiSkeleton"

const Akademi = lazy(() => import("./pages/Akademi"))
const Civiclab = lazy(() => import("./pages/Civiclab"))
const Forum = lazy(() => import("./pages/Forum"))
const DiscussionDetail = lazy(() => import("./pages/DiscussionDetail"))
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"))
const AdminReports = lazy(() => import("./pages/admin/AdminReports"))
const AdminDiscussions = lazy(() => import("./pages/admin/AdminDiscussions"))

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "akademi", element: <LazyPage fallback={<AkademiSkeleton />}><Akademi /></LazyPage> },
            { path: "civiclab", element: <LazyPage><Civiclab /></LazyPage> },
            { path: "forum", element: <LazyPage><Forum /></LazyPage> },
            { path: "forum/:id", element: <LazyPage><DiscussionDetail /></LazyPage> },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "signup",
        element: <SignUp />
    },
    {
        path: "admin",
        element: <ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminLayout /></ProtectedRoute>,
        children: [
            { index: true, element: <LazyPage><AdminDashboard /></LazyPage> },
            { path: "reports", element: <LazyPage><AdminReports /></LazyPage> },
            { path: "discussions", element: <LazyPage><AdminDiscussions /></LazyPage> },
        ],
    },
])