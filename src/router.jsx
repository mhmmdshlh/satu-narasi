import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Akademi } from "./pages/Akademi";
import { Civiclab } from "./pages/Civiclab";
import { Forum } from "./pages/Forum";
import { DiscussionDetail } from "./pages/DiscussionDetail";
import MainLayout from "./layouts/MainLayout";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "akademi", element: <Akademi /> },
            { path: "civiclab", element: <Civiclab /> },
            { path: "forum", element: <Forum /> },
            { path: "forum/:id", element: <DiscussionDetail /> },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "signup",
        element: <SignUp />
    }
])
