import { getCourseById } from "@/services/courseService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PiSealWarningFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { ConfigProvider, Image, Menu, Skeleton } from "antd";
import { IoCheckmarkOutline } from "react-icons/io5";
import { getAssignmentByCourseId } from "@/services/assignmentsService";
import { MdAssignment } from "react-icons/md";
import { MdAssignmentLate } from "react-icons/md";
import AssignmentsMenu from "@/components/AssignmentsMenu";

type Props = {};

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

export interface assignmentsResponse {
    $id: string;
    assignmentId: string;
    courseId: string;
    title: string;
    description: string;
    dueDate: string;
    createdAt: string;
    assignmentSubmissions: {
        $id: string;
        $values: [];
    };
    course: string;
}

const CourseDetail = (props: Props) => {
    const [course, setCourse] = useState<courseResponse | null>(null);
    const [assignments, setAssignments] = useState<
        assignmentsResponse[] | null
    >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams();
    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                setLoading(true);
                const response: courseResponse = await getCourseById(id!);
                if (response) {
                    setCourse(response);
                }
            } catch (error: any) {
                console.log("error: ", error);
            } finally {
                setLoading(false);
            }
        };

        const debounceLoading = setTimeout(() => {
            fetchCourseDetail();
        }, 1000);

        return () => clearTimeout(debounceLoading);
    }, []);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await getAssignmentByCourseId(id!);
                if (response) {
                    setAssignments(response.$values);
                }
            } catch (error) {
                console.log("error: ", error);
            }
        };

        fetchAssignments();
    }, []);
    return (
        <>
            <div className="relative w-full min-h-[500px] flex justify-center gap-5">
                {/* IMAGE */}
                <div className="absolute w-2/5 right-5 top-10 flex justify-center items-center">
                    <div className="">
                        <Image
                            width={350}
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            alt="Course Thumnail"
                        />
                    </div>
                </div>
                {/* INFORMATION */}
                <div className="w-full text-white bg-gray-800">
                    <div className="w-3/5 px-28 py-4">
                        {loading ? (
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Skeleton: {
                                            gradientFromColor: "#2e2e30",
                                            gradientToColor: "#17171b",
                                        },
                                    },
                                }}
                            >
                                <Skeleton
                                    className="w-1/3 h-full my-5"
                                    loading={loading}
                                    active
                                    paragraph={{ rows: 4 }}
                                />
                            </ConfigProvider>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold my-3">
                                    {course?.courseName}
                                </h1>
                                <p className="text-xl my-2">
                                    {course?.description}
                                </p>
                                <p className="text-[0.8rem]">
                                    Created by{" "}
                                    <span className="text-purple-400 font-bold hover:underline">
                                        <Link to="">
                                            {course?.createdBy.fullName}
                                        </Link>
                                    </span>
                                </p>
                                <p className="text-[0.8rem] flex items-center gap-1">
                                    <span>
                                        <MdDateRange className="text-[1rem] text-white" />
                                    </span>
                                    From <span>{course?.startDate}</span> To{" "}
                                    <span>{course?.endDate}</span>
                                </p>
                                <div className="flex items-center gap-3">
                                    <p className="text-[0.8rem] flex items-center gap-1">
                                        <span>
                                            <PiSealWarningFill className="text-white text-[1rem]" />
                                        </span>{" "}
                                        Last Updated{" "}
                                        {`${course?.startDate.split("-")[2]}/${course?.startDate.split("-")[0]}`}
                                    </p>
                                    <p className="text-[0.8rem] flex items-center gap-1">
                                        <span>
                                            <MdLanguage className="text-white text-[1rem]" />
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
                                        You need to complete all assignments on
                                        time to pass the course.
                                    </p>
                                </div>
                            </>
                        )}
                        {/* ASSIGNMENTS MENU */}
                        <AssignmentsMenu
                            title="Assigments"
                            items={assignments!}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseDetail;
