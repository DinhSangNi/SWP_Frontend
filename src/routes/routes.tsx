import Home from "@/pages/Home/index.tsx";
import Login from "@/pages/Login/index.tsx";
import SignUp from "@/pages/SignUp/index.tsx";
import MainLayout from "@/components/MainLayout";
import DashboardLayout from "@/components/DashboardLayout";
import AdminContent from "@/components/AdminContent";

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
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "teachers",
                element: <AdminContent type="Teacher" />,
            },
            {
                path: "students",
                element: <AdminContent type="Student" />,
            },
            {
                path: "courses",
                element: <AdminContent type="Courses" />,
            },
            {
                path: "coursesEnrollments",
                element: <AdminContent type="CoursesEnrollments" />,
            },
        ],
    },
];
