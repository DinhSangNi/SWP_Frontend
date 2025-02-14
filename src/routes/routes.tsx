import Home from "@/pages/Home/index.tsx";
import Login from "@/pages/Login/index.tsx";
import SignUp from "@/pages/SignUp/index.tsx";
import MainLayout from "@/components/MainLayout";

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "signup",
        element: <SignUp />,
    },
];
