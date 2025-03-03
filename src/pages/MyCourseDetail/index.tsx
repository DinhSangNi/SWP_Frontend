import { getCourseById } from "@/services/courseService";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PiSealWarningFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { Button, ConfigProvider, Image, message, Skeleton } from "antd";
import { IoCheckmarkOutline } from "react-icons/io5";
import {
    getAssignmentByAssignmentId,
    getAssignmentByCourseId,
    submitAssignment,
} from "@/services/assignmentsService";
import AssignmentsMenu from "@/components/AssignmentsMenu";
import TextEditor from "@/components/TextEditor";
import { formatDate } from "@/utils/dateUtils";
import { motion } from "framer-motion";
import CustomSkeleton from "@/components/CustomSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { toast } from "react-toastify";

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

export interface AssignmentResponse {
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

export type AssignmentSubmissions = {
    $id: string;
    submissionId: string;
    assignmentId: string;
    studentId: string;
    submissionDate: string;
    grade: string;
    feedback: string;
    submissionLink: string;
};

const MyCourseDetail = () => {
    const [course, setCourse] = useState<courseResponse | null>(null);
    const [assignments, setAssignments] = useState<AssignmentResponse[] | null>(
        []
    );
    const [completedAssignment, setCompletedAssignment] = useState<
        AssignmentResponse[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingAssign, setLoadingAssign] = useState<boolean>(true);
    // Content of text editor
    const [content, setContent] = useState<string>("");
    const [assignment, setAssignment] = useState<AssignmentResponse | null>(
        null
    );
    const [messageApi, contextHolder] = message.useMessage();

    // Get course id from URL
    const { id } = useParams();

    // Get user
    const user = useSelector((state: RootState) => state.auth.user);

    const navigate = useNavigate();

    // Fetch assignment
    const handleFetchAssginment = useCallback(async (assignmentId: string) => {
        try {
            setLoadingAssign(true);
            const response = await getAssignmentByAssignmentId(assignmentId);
            console.log("response: ", response);
            if (response?.status === 200) {
                const assignmentSubmission =
                    response.data.assignmentSubmissions.$values.find(
                        (item: any) => {
                            return item.studentId === user?.idUser;
                        }
                    );
                if (assignmentSubmission) {
                    setContent(assignmentSubmission.feedback);
                } else {
                    setContent("");
                }
                setAssignment(response.data);
            }
        } catch (error: any) {
            console.log("error: ", error);
        } finally {
            setLoadingAssign(false);
        }
    }, []);

    // Submit assignment
    const handleSubmitAssignment = async () => {
        try {
            const response = await submitAssignment(
                assignment!.assignmentId,
                user!.idUser,
                content
            );
            if (response) {
                messageApi.success("Submit successfully!");
            }
        } catch (error) {
            console.log("error: ", error);
            messageApi.error("Submit failed!");
        }
    };

    useEffect(() => {
        let debounceLoading: NodeJS.Timeout;

        const fetchCourseDetail = async () => {
            try {
                setLoading(true);
                const response = await getCourseById(id!);
                if (response.status === 200) {
                    setCourse(response.data);
                }
            } catch (error: any) {
                if (error.status === 401) {
                    debounceLoading = setTimeout(() => {
                        toast.error("Your token expired!");
                        navigate("/login");
                    }, 1000);
                }
                console.log("error: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetail();

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

    useEffect(() => {
        if (assignments) {
            const newArr: Partial<AssignmentResponse>[] = [];
            assignments.forEach((asg: any) => {
                if (
                    asg.assignmentSubmissions.$values.find(
                        (item: any) => item.studentId === user?.idUser
                    )
                ) {
                    newArr.push(asg);
                }
            });
            if (newArr) {
                setCompletedAssignment(newArr as AssignmentResponse[]);
            }
        }
    }, [assignments]);

    return (
        <>
            {contextHolder}
            <div className=" w-mainContent mx-auto min-h-[500px] bg-gray-100 px-10 pb-10">
                <div className="flex justify-between">
                    {/* IMAGE */}
                    <div className="basis-2/5 flex justify-center py-4 my-3">
                        <div className="">
                            <Image
                                width={410}
                                src="https://i.ytimg.com/vi/gp5H0Vw39yw/maxresdefault.jpg"
                                alt="Course Thumnail"
                            />
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
                                    <p className="text-xl my-2">
                                        {course?.description}
                                    </p>
                                    <p className="text-[0.8rem]">
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* ASSIGNMENTS MENU */}
                {!loading ? (
                    <div className="">
                        <AssignmentsMenu
                            title="Assigments"
                            items={assignments!}
                            completedAssignment={completedAssignment}
                            onClick={handleFetchAssginment}
                        />
                    </div>
                ) : (
                    <CustomSkeleton className="w-[150px] h-7" />
                )}
                {/* ASSIGNMENT TEXTBOX */}
                {assignment && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                        className="mt-10 mx-6"
                    >
                        {!loadingAssign ? (
                            <>
                                <div className="w-full flex justify-between">
                                    <div>
                                        <h1 className="font-bold text-[1.1rem]">
                                            Title: {assignment.title}
                                        </h1>
                                        <p className="text-[0.9rem]">
                                            Topic: {assignment.description}{" "}
                                            {!assignment.description
                                                .trim()
                                                [
                                                    assignment.description.trim()
                                                        .length - 1
                                                ].includes("?") && "?"}
                                        </p>
                                    </div>
                                    <p>
                                        Due to:{" "}
                                        <span className="font-bold">
                                            {formatDate(assignment.dueDate)}
                                        </span>
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-full flex justify-between">
                                    <CustomSkeleton className="basis-1/4 h-5" />
                                    <CustomSkeleton className="basis-1/4 h-5" />
                                </div>
                                <CustomSkeleton className="w-1/3 h-5 mt-3" />
                            </>
                        )}
                        <div className="py-10">
                            <TextEditor
                                content={content}
                                onContentChange={setContent}
                            />
                        </div>
                        {/* <CustomSkeleton /> */}
                        <div className="w-full text-end">
                            <Button
                                color="purple"
                                variant="solid"
                                className="font-bold"
                                onClick={handleSubmitAssignment}
                            >
                                Submit
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default MyCourseDetail;
