import {
    enrollCourse,
    getAllCourses,
    getCourseById,
} from "@/services/courseService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PiSealWarningFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { Button, ConfigProvider, Image, Skeleton } from "antd";
import { IoCheckmarkOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import CourseCarousel from "@/components/CourseCarousel";
import { CourseType } from "../Home";
import CustomSkeleton from "@/components/CustomSkeleton";
import { handleWhenTokenExpire } from "@/utils/authUtils";

interface courseResponse {
    $id: string;
    courseId: string;
    courseName: string;
    createdBy: {
        $id: string;
        fullName: string;
        role: string;
    };
    description: string;
    endDate: string;
    startDate: string;
}

const CourseDetail = () => {
    const [course, setCourse] = useState<courseResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [enrollLoading, setEnrollLoading] = useState<boolean>(false);
    const [couresCarouselLoading, setCourseCarouselLoading] =
        useState<boolean>(false);
    const [courses, setCourses] = useState<CourseType[] | null>(null);

    // Get course id from URL
    const { id } = useParams();

    const navigate = useNavigate();

    const handleEnrollCourse = async () => {
        try {
            setEnrollLoading(true);
            const response = await enrollCourse(id!);
            if (response.status === 200 || response.status === 201) {
                toast.success(
                    "Enroll Successfully! Please waiting for admin to confirm."
                );
            }
        } catch (error: any) {
            console.log("error: ", error);
            toast.error("Enroll failed!");
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setEnrollLoading(false);
        }
    };

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                setLoading(true);
                const response = await getCourseById(id!);
                if (response.status === 200) {
                    setCourse(response.data);
                }
            } catch (error: any) {
                if (error.status === 401) {
                    toast.error("Your token expired! Please re-authenticate!");
                    navigate("/login");
                }
                console.log("error: ", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllCourse = async () => {
            try {
                setCourseCarouselLoading(true);
                const response = await getAllCourses();
                if (response.status === 200) {
                    setCourses(response.data.$values);
                }
            } catch (error: any) {
                console.log("error: ", error);
            } finally {
                setCourseCarouselLoading(false);
            }
        };

        fetchCourseDetail();
        fetchAllCourse();
    }, []);

    return (
        <>
            <div className="w-mainContent mx-auto min-h-[500px] bg-gray-100 px-10 pb-10">
                <div className="flex justify-between">
                    {/* IMAGE */}
                    <div className="basis-2/5 flex justify-center py-4 my-3">
                        <div className="">
                            {loading ? (
                                <CustomSkeleton className="w-[410px] h-full" />
                            ) : (
                                <Image
                                    width={410}
                                    src="https://i.ytimg.com/vi/gp5H0Vw39yw/maxresdefault.jpg"
                                    alt="Course Thumnail"
                                />
                            )}
                        </div>
                    </div>
                    {/* INFORMATION */}
                    <div className="basis-3/5 text-black">
                        <div className="w-full px-28 py-4">
                            {loading ? (
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Skeleton: {
                                                // gradientFromColor: "#2e2e30",
                                                // gradientToColor: "#17171b",
                                            },
                                        },
                                    }}
                                >
                                    <Skeleton
                                        className="w-1/3 h-full my-5"
                                        loading={loading}
                                        active
                                        paragraph={{ rows: 6 }}
                                    />
                                </ConfigProvider>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold my-3">
                                        {course?.courseName}
                                    </h1>
                                    <p className="text-xl my-3">
                                        {course?.description}
                                    </p>
                                    <p className="text-[1rem]">
                                        Created by{" "}
                                        <span className="text-purple-600 font-bold hover:underline">
                                            <Link to="">
                                                {course?.createdBy.fullName}
                                            </Link>
                                        </span>
                                    </p>
                                    <p className="text-[0.8rem] flex items-center gap-1">
                                        <span>
                                            <MdDateRange className="text-[1rem] text-black" />
                                        </span>
                                        From <span>{course?.startDate}</span> To{" "}
                                        <span>{course?.endDate}</span>
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <p className="text-[0.8rem] flex items-center gap-1">
                                            <span>
                                                <PiSealWarningFill className="text-black text-[1rem]" />
                                            </span>{" "}
                                            Last Updated{" "}
                                            {`${course?.startDate.split("-")[2]}/${course?.startDate.split("-")[0]}`}
                                        </p>
                                        <p className="text-[0.8rem] flex items-center gap-1">
                                            <span>
                                                <MdLanguage className="text-black text-[1rem]" />
                                            </span>{" "}
                                            VietNamese{" "}
                                        </p>
                                    </div>
                                    <div className="text-[0.8rem] my-5">
                                        <h1 className="text-[0.9rem]">
                                            What you need to do
                                        </h1>
                                        <p className="flex items-center gap-2">
                                            <IoCheckmarkOutline className="text-[0.9rem]" />
                                            You need to complete all assignments
                                            on time to pass the course.
                                        </p>
                                    </div>
                                    <div>
                                        <Button
                                            variant="solid"
                                            color="purple"
                                            loading={enrollLoading}
                                            className="px-5 py-3 font-bold rounded-sm"
                                            onClick={handleEnrollCourse}
                                        >
                                            Enroll
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* COURSES CAROUSEL */}
                <div className="w-full mt-16">
                    <CourseCarousel
                        heading={
                            <h1 className="text-2xl font-bold">
                                You also might like
                            </h1>
                        }
                        items={courses}
                        loading={couresCarouselLoading}
                    />
                </div>
            </div>
        </>
    );
};

export default CourseDetail;
