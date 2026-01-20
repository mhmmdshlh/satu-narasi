import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Akademi } from "./pages/Akademi";
import { Civiclab } from "./pages/Civiclab";
import { Forum } from "./pages/Forum";
import MainLayout from "./layouts/MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "akademi", element: <Akademi /> },
            { path: "civiclab", element: <Civiclab /> },
            { path: "forum", element: <Forum /> },
        ],
    }
])
