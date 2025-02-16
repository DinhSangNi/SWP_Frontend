import Home from "@/pages/Home/index.tsx";
import Login from "@/pages/Login/index.tsx";
import SignUp from "@/pages/SignUp/index.tsx";
import MainLayout from "@/components/MainLayout";
import DashboardLayout from "@/components/DashboardLayout";
import AdminContent from "@/components/AdminContent";
import Course from "@/pages/Course/index.tsx";
import Student from "@/pages/Admin/Students";
import Teacher from "@/pages/Admin/Teacher";
import Courses from "@/pages/Admin/Courses";
export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path:"/course",
                element: <Course />
            }
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
                element: <Teacher  type="teacher"/>
            },
            {
                path: "students",
                element: <Student type="student"/>
            },
            {
                path: "courses",
                element: <Courses type="Courses" />,
            },
            {
                path: "coursesEnrollments",
                element: <AdminContent type="CoursesEnrollments" />,
            },
        ],
    },
];
