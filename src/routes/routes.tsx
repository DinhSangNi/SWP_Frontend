import Home from "@/pages/Home/index.tsx";
import Login from "@/pages/Login/index.tsx";
import SignUp from "@/pages/SignUp/index.tsx";
import MainLayout from "@/components/MainLayout";
import DashboardLayout from "@/components/DashboardLayout";
import Course from "@/pages/Course/index.tsx";
import Student from "@/pages/Admin/Students";
import Teacher from "@/pages/Admin/Teacher";
import Courses from "@/pages/Admin/Courses";
import Profile from "@/pages/Profile";
import MyCourses from "@/pages/MyCourses";
import Search from "@/pages/Search";
import MyCourseDetail from "@/pages/MyCourseDetail";
import TestTailwind from "@/pages/TestTailwind";
import ForgotPassword from "@/pages/ForgotPassword";
import CourseDetail from "@/pages/CourseDetail";
import AllCourses from "@/pages/AllCourses";
import CoursesEnrollments from "@/pages/Admin/CoursesEnrollments";
import Assignments from "@/pages/Admin/Assignments";
import AssignmentSubmissions from "@/pages/Admin/AssignmentSubmissions";
import QnA from "@/pages/QnA";
import QnADetail from "@/pages/QnA/QnADetail";
import Announcements from "@/pages/Admin/Announcements";
import path from "path";
import AnnouncementsUser from "@/pages/AnnouncementsUser";
import Test from "@/pages/TestTailwind/Test";
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
                path: "/course",
                element: <Course />,
            },
            {
                path: "/all-courses",
                element: <AllCourses />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/myCourses",
                element: <MyCourses />,
            },
            {
                path: "/myCourses/:courseId",
                element: <MyCourseDetail />,
            },
            {
                path: "/courses/:id",
                element: <CourseDetail />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/QnA",
                element: <QnA />,
            },
            {
                path: "/QnA/:id",
                element: <QnADetail />,
            },
            {
                path: "/announcements-user",
                element: <AnnouncementsUser />,
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
        path: "forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "teachers",

                element: <Teacher type="teacher" />,
            },
            {
                path: "students",
                element: <Student type="student" />,
            },
            {
                path: "courses",
                element: <Courses type="Courses" />,
            },

            {
                path: "courses-enrollments",
                element: <CoursesEnrollments />,
            },
            {
                path: "courses/:courseId/assignments",
                element: <Assignments />,
            },
            {
                path: "courses/:courseId/assignments/:assignmentId/submissions",
                element: <AssignmentSubmissions />,
            },
            {
                path: "announcements",
                element: <Announcements />,
            },
        ],
    },

    {
        path: "test-tailwind",
        element: <TestTailwind />,
    },
    {
        path: "test",
        element: <Test />,
    },
];
