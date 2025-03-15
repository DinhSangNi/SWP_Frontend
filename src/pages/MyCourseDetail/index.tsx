import { getCourseById } from "@/services/courseService";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PiSealWarningFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import {
    Button,
    ConfigProvider,
    DatePicker,
    Form,
    Image,
    Input,
    message,
    Modal,
    Skeleton,
    Space,
    Table,
    Tooltip,
} from "antd";
import { IoCheckmarkOutline } from "react-icons/io5";
import {
    createNewAssignment,
    deleteAssignment,
    editAssignment,
    editSubmission,
    getAssignmentByAssignmentId,
    getAssignmentByCourseId,
    getAssignmentSubmission,
    getStudentsNotSubmitted,
    gradeSubmission,
    submitAssignment,
} from "@/services/assignmentsService";
import AssignmentsMenu from "@/components/AssignmentsMenu";
import TextEditor from "@/components/TextEditor";
import { formatDate } from "@/utils/dateUtils";
import { AnimatePresence, motion } from "framer-motion";
import CustomSkeleton from "@/components/CustomSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { toast } from "react-toastify";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { CiCirclePlus } from "react-icons/ci";
import { useForm } from "antd/es/form/Form";
import { BiDetail } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { PaginationType } from "@/stores/types";
import dayjs from "dayjs";
import { FaEdit } from "react-icons/fa";
import SpinnerLoading from "@/components/SpinnerLoading";
import { IoIosArrowDropup } from "react-icons/io";
import CustomRadio from "@/components/CustomRadio";

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
    teacher: {
        fullName: string;
    };
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
    const [submissionContent, setSubmissionContent] = useState<string>("");
    const [assignment, setAssignment] = useState<AssignmentResponse | null>(
        null
    );
    const [messageApi, contextHolder] = message.useMessage();
    const [reload, setReload] = useState<boolean>(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [submissionsListLoading, setSubmissionsListLoading] =
        useState<boolean>(false);
    const [createModalVisible, setCreateModalVisible] =
        useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
    const [deleteModalVisible, setDeleteModalVisible] =
        useState<boolean>(false);
    const [isEditSubmission, setIsEditSubmission] = useState<boolean>(false);

    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [grade, setGrade] = useState<string>("");
    const [openFeedbackBoxArray, setOpenFeedbackBoxArray] = useState<number[]>(
        []
    );
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [openSubmissionsList, setOpenSubmissionsList] =
        useState<boolean>(false);
    const [submissionOfStudent, setSubmissionOfStudent] = useState<any>(null);
    const [isVisibleButton, setIsVisibleButton] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState<string>("");
    const [submissionsByGraded, setSubmissionsByGraded] = useState<any[]>([]);
    const [studentsNotSubmitted, setStudentsNotSubmitted] = useState<any[]>([]);

    // Get user
    const user = useSelector((state: RootState) => state.auth.user);

    const navigate = useNavigate();
    const { courseId } = useParams();
    const [form] = useForm();

    const handleReload = () => {
        setReload(!reload);
    };

    // Fetch assignment
    const handleFetchAssginment = useCallback(async (assignmentId: string) => {
        try {
            setLoadingAssign(true);
            const response = await getAssignmentByAssignmentId(assignmentId);
            if (response?.status === 200) {
                console.log("response: ", response.data.assignmentSubmissions);
                const assignmentSubmission =
                    response.data.assignmentSubmissions.$values.find(
                        (item: any) => {
                            return item.studentId === user?.idUser;
                        }
                    );
                if (assignmentSubmission) {
                    setSubmissionContent(assignmentSubmission.submissionLink);
                    setSubmissionOfStudent(assignmentSubmission);
                } else {
                    setSubmissionContent("");
                    setSubmissionOfStudent(null);
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
                toast.success("Submit successfully!");
                handleReload();
            }
        } catch (error) {
            console.log("error: ", error);
            messageApi.error("Submit failed!");
        }
    };

    const handleEditSubmission = async () => {
        try {
            if (Date.now() <= dayjs(selectedAssignment.dueDate).valueOf()) {
                const response = await editSubmission(
                    submissionOfStudent.submissionId,
                    {
                        submissionLink: submissionContent,
                    }
                );
                if (response.status === 200) {
                    toast.success("Save Successfully!");
                    setIsEditSubmission(false);
                }
            } else {
                toast.error("Save failed! Assignment is expired!");
            }
        } catch (error: any) {
            console.log("error: ", error);
            toast.error("Save Failed!");
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        let debounceLoading: NodeJS.Timeout;

        const fetchCourseDetail = async () => {
            try {
                setLoading(true);
                const response = await getCourseById(courseId!);
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
        if (selectedAssignment) {
            form.setFieldsValue({
                title: selectedAssignment.title,
                description: selectedAssignment.description,
                dueDate: dayjs(selectedAssignment.dueDate),
            });
        } else {
            form.setFieldsValue({ title: "", description: "", dueDate: null });
        }
    }, [selectedAssignment]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await getAssignmentByCourseId(courseId!);
                if (response) {
                    setAssignments(response.data.$values);
                }
            } catch (error: any) {
                console.log("error: ", error);
                if (error.status === 401) {
                    handleWhenTokenExpire();
                    navigate("/login");
                }
            }
        };

        fetchAssignments();
    }, [reload]);

    const handleSubmitCreateForm = async (credentials: any) => {
        try {
            setModalLoading(true);
            const response = await createNewAssignment({
                courseId: courseId,
                title: credentials.title,
                description: credentials.description,
                dueDate: credentials.dueDate.format("YYYY-MM-DD"),
            });
            if (response.status === 201) {
                toast.success("Create successfully !");
                setCreateModalVisible(false);
                handleReload();
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setModalLoading(false);
        }
    };

    // Resolve completed assignments of student
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

    // Hàm xử lý phân trang
    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev: any) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    // Delete assignment function
    const handleDeleteAssignment = async (assignmentId: number) => {
        try {
            const response = await deleteAssignment(assignmentId);
            if (response.status === 204) {
                toast.success("Delete sucessfully !");
                handleReload();
                setDeleteModalVisible(false);
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    // Submit edit form function
    const handelSubmitEditForm = async (credentials: any) => {
        try {
            setModalLoading(true);
            const response = await editAssignment(
                selectedAssignment!.assignmentId,
                {
                    title: credentials.title,
                    description: credentials.description,
                    dueDate: credentials.dueDate.format("YYYY-MM-DD"),
                }
            );
            if (response.status === 200) {
                toast.success("Edit successfully !");
                handleReload();
                setEditModalVisible(false);
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setModalLoading(false);
        }
    };

    // Open feedback box function
    const handleOpenFeedBackBox = (submissionId: number) => {
        if (openFeedbackBoxArray.includes(submissionId)) {
            const arr = openFeedbackBoxArray.filter((index) => {
                return index !== submissionId;
            });
            setOpenFeedbackBoxArray(arr);
        } else {
            setOpenFeedbackBoxArray((prev) => [...prev, submissionId]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrade(e.target.value);
    };

    // Save grade and feedback function
    const handleSaveGradeAndFeedback = async (submissionId: number) => {
        try {
            setSaveLoading(true);
            const response = await gradeSubmission(submissionId, {
                grade: grade,
                feedback: content,
            });
            if (response.status === 200) {
                toast.success("Save Successfully!");
                fetchSubminssions();
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setSaveLoading(false);
        }
    };

    // Fetch submissions function
    const fetchSubminssions = async () => {
        setSubmissionsListLoading(true);
        try {
            const response = await getAssignmentSubmission(
                selectedAssignment.assignmentId
            );
            if (response.status === 200) {
                setSubmissions(response.data.$values);
                return;
            }
        } catch (error: any) {
            console.log("error: ", error);
            setSubmissions([]);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setSubmissionsListLoading(false);
        }
    };

    console.log("selectedRadio: ", selectedRadio);

    const fetchStudentsNotSubmitted = async () => {
        try {
            const res = await getStudentsNotSubmitted(
                selectedAssignment.assignmentId
            );
            console.log("data: ", res.data);
            if (res.status === 200 || res.status === 201) {
                setStudentsNotSubmitted(res.data.$values);
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        if (submissions && selectedRadio.length > 0) {
            const gradedSubmissions = submissions.filter((sub: any) => {
                return selectedRadio === "Graded" ? sub.grade : !sub.grade;
            });
            setSubmissionsByGraded(gradedSubmissions);
        } else {
            setSubmissionsByGraded([]);
        }

        if (selectedRadio === "Unsubmitted") {
            fetchStudentsNotSubmitted();
        }
    }, [selectedRadio]);

    // Fetch submission from DB
    useEffect(() => {
        if (selectedAssignment && openSubmissionsList) {
            fetchSubminssions();
        }
    }, [selectedAssignment]);

    // Check scrollY of window to make scroll to top button visible or invisisble
    useEffect(() => {
        const scrollPage = () => {
            if (window.scrollY > 300) {
                setIsVisibleButton(true);
            } else {
                setIsVisibleButton(false);
            }
        };

        window.addEventListener("scroll", scrollPage);

        return () => {
            window.removeEventListener("scroll", scrollPage);
        };
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {contextHolder}
            <div className=" w-mainContent mx-auto min-h-[500px] bg-gray-100 px-10 pb-10 relative">
                <AnimatePresence>
                    {isVisibleButton && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "linear" }}
                            id="back-to-top"
                            className="fixed right-5 bottom-5"
                        >
                            <Button
                                color="purple"
                                variant="text"
                                className="px-1 py-7"
                                onClick={scrollToTop}
                            >
                                <IoIosArrowDropup className="text-purple-500 text-5xl" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                        {user?.role === "Student" ? (
                            <AssignmentsMenu
                                title="Assigments"
                                items={assignments!}
                                completedAssignment={completedAssignment}
                                onClick={handleFetchAssginment}
                                setSelectedAssignment={setSelectedAssignment}
                            />
                        ) : (
                            user?.role === "Teacher" && (
                                <div className="w-full">
                                    <div className="w-full flex justify-between items-center mb-5">
                                        <h1 className="text-2xl font-bold">
                                            Assignments{" "}
                                            <span>({assignments?.length})</span>
                                        </h1>
                                        <button
                                            className="p-1 transition-colors duration-300 hover:bg-purple-200"
                                            onClick={() =>
                                                setCreateModalVisible(true)
                                            }
                                        >
                                            <CiCirclePlus className="text-[2rem]" />
                                        </button>
                                    </div>
                                    <div>
                                        <div className="w-full">
                                            <Table
                                                rowClassName={(record) =>
                                                    record.assignmentId ===
                                                    selectedAssignment?.assignmentId
                                                        ? "bg-purple-200"
                                                        : ""
                                                }
                                                rowHoverable={false}
                                                scroll={{
                                                    y: 380,
                                                }}
                                                columns={[
                                                    {
                                                        title: "ID",
                                                        dataIndex:
                                                            "assignmentId",
                                                        key: "assignmentId",
                                                        width: "10%",
                                                    },
                                                    {
                                                        title: "Course ID",
                                                        dataIndex: "courseId",
                                                        key: "courseId",
                                                        width: "10%",
                                                    },
                                                    {
                                                        title: "Title",
                                                        dataIndex: "title",
                                                        key: "title",
                                                    },
                                                    {
                                                        title: "Description",
                                                        dataIndex:
                                                            "description",
                                                        key: "description",
                                                    },
                                                    {
                                                        title: "Due Date",
                                                        dataIndex: "dueDate",
                                                        key: "dueDate",
                                                    },
                                                    {
                                                        title: "Action",
                                                        dataIndex: "action",
                                                        key: "action",
                                                        render: (
                                                            _: any,
                                                            record: any
                                                        ) => {
                                                            return (
                                                                <Space size="middle">
                                                                    {/* Detail button */}
                                                                    <Tooltip
                                                                        title="Detail"
                                                                        placement="top"
                                                                    >
                                                                        <Button
                                                                            variant="solid"
                                                                            color="purple"
                                                                            className="text-white px-2"
                                                                            onClick={() => {
                                                                                setOpenSubmissionsList(
                                                                                    true
                                                                                );
                                                                                setSelectedAssignment(
                                                                                    record
                                                                                );
                                                                                setSelectedRadio(
                                                                                    ""
                                                                                );
                                                                            }}
                                                                        >
                                                                            <BiDetail className="text-[1rem]" />
                                                                        </Button>
                                                                    </Tooltip>

                                                                    {/* Edit button */}
                                                                    <Tooltip
                                                                        title="Edit"
                                                                        placement="top"
                                                                    >
                                                                        <Button
                                                                            color="yellow"
                                                                            variant="solid"
                                                                            className="text-white bg-yellow-400 px-2"
                                                                            onClick={() => {
                                                                                setEditModalVisible(
                                                                                    true
                                                                                );
                                                                                setSelectedAssignment(
                                                                                    record
                                                                                );
                                                                            }}
                                                                        >
                                                                            <FiEdit3 className="text-[1rem]" />
                                                                        </Button>
                                                                    </Tooltip>

                                                                    {/* Delete button */}
                                                                    <Tooltip
                                                                        title="Delete"
                                                                        placement="top"
                                                                    >
                                                                        <Button
                                                                            type="primary"
                                                                            danger
                                                                            className="px-2"
                                                                            onClick={() => {
                                                                                setSelectedAssignment(
                                                                                    record
                                                                                );
                                                                                setDeleteModalVisible(
                                                                                    true
                                                                                );
                                                                            }}
                                                                        >
                                                                            <AiOutlineDelete className="text-[1rem]" />
                                                                        </Button>
                                                                    </Tooltip>
                                                                </Space>
                                                            );
                                                        },
                                                    },
                                                ]}
                                                dataSource={assignments!} // Sử dụng hàm getDataSource để chọn dữ liệu phù hợp
                                                loading={loading} // Hiển thị loading khi đang fetch dữ liệu
                                                className="w-full"
                                                pagination={{
                                                    current:
                                                        pagination.currentPage,
                                                    pageSize:
                                                        pagination.pageSize,
                                                    showSizeChanger: true,
                                                    pageSizeOptions: [
                                                        "5",
                                                        "10",
                                                        "20",
                                                    ],
                                                    onChange: handlePageChange,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <CustomSkeleton className="w-[150px] h-7" />
                )}
                {/* ASSIGNMENT TEXTBOX */}
                {assignment && user?.role === "Student" && (
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
                                        <p className="text-[0.9rem] mb-3">
                                            Description:{" "}
                                            {assignment.description}{" "}
                                            {!assignment.description
                                                .trim()
                                                [
                                                    assignment.description.trim()
                                                        .length - 1
                                                ].includes("?") && "?"}
                                        </p>
                                        <div>
                                            <p>
                                                Submission date:{" "}
                                                <span>
                                                    {dayjs(
                                                        submissionOfStudent.submissionDate
                                                    ).format("DD/MM/YYYY")}
                                                </span>
                                            </p>
                                            <p>
                                                Grade:{" "}
                                                <span>
                                                    {submissionOfStudent.grade}
                                                </span>
                                            </p>
                                        </div>
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
                                readOnly={!isEditSubmission}
                                content={submissionContent}
                                onContentChange={setSubmissionContent}
                            />
                        </div>
                        <div className="w-full text-end">
                            {!submissionOfStudent || isEditSubmission ? (
                                <>
                                    {isEditSubmission ? (
                                        <>
                                            <Button
                                                color="yellow"
                                                variant="solid"
                                                className="font-bold mr-3"
                                                onClick={() =>
                                                    setIsEditSubmission(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                color="purple"
                                                variant="solid"
                                                className="font-bold"
                                                onClick={handleEditSubmission}
                                            >
                                                Save
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            color="purple"
                                            variant="solid"
                                            className="font-bold"
                                            onClick={handleSubmitAssignment}
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <Button
                                    color="purple"
                                    variant="solid"
                                    className="font-bold"
                                    onClick={() => setIsEditSubmission(true)}
                                >
                                    Edit
                                </Button>
                            )}
                        </div>
                        {/* Feedback of Teacher */}
                        {user?.role === "Student" && submissionOfStudent && (
                            <div className="">
                                <div>Feedback of teacher: </div>
                                <div className="min-h-[150px] border-[1px] border-gray-300 ">
                                    <div className="w-full mt-3 px-3 text-gray-600 flex justify-between border-b-[1px] border-gray-300">
                                        <div className="mb-3 flex gap-1">
                                            <p className="font-bold text-black">
                                                {course?.teacher?.fullName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full px-8">
                                        <div
                                            className=""
                                            dangerouslySetInnerHTML={{
                                                __html: submissionOfStudent?.feedback,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Submissions List */}
                {openSubmissionsList ? (
                    !submissionsListLoading ? (
                        <div>
                            <div className="flex justify-start gap-3 items-end py-5">
                                <h1 className="font-bold text-xl">
                                    Submissions of students
                                </h1>
                                <div>
                                    <CustomRadio
                                        items={[
                                            "Graded",
                                            "Ungraded",
                                            "Unsubmitted",
                                        ]}
                                        onChange={setSelectedRadio}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                {selectedRadio !== "Unsubmitted" ? (
                                    submissions.length > 0 ? (
                                        (submissionsByGraded?.length > 0
                                            ? submissionsByGraded
                                            : submissions
                                        ).map((submission: any) => {
                                            return (
                                                <div
                                                    key={
                                                        submission.submissionId
                                                    }
                                                    className="w-full flex flex-col gap-4 mb-5"
                                                >
                                                    <div className="min-h-[250px] border-[1px] border-gray-300 bg-white">
                                                        <div className="w-full mt-3 px-3 text-gray-600 flex justify-between border-b-[1px] border-gray-300">
                                                            <div className="mb-3 flex gap-1">
                                                                <p className="font-bold text-black">
                                                                    {
                                                                        submission.studentName
                                                                    }
                                                                </p>
                                                                <p>
                                                                    on{" "}
                                                                    <span>
                                                                        {dayjs(
                                                                            submission.submissionDate
                                                                        ).format(
                                                                            "YYYY-MM-DD HH:mm:ss"
                                                                        )}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="flex gap-4">
                                                                <div className="flex items-start gap-2">
                                                                    <div
                                                                        className="flex items-start gap-2 transition-opacity duration-300 hover:opacity-60 cursor-pointer"
                                                                        onClick={() =>
                                                                            handleOpenFeedBackBox(
                                                                                submission.submissionId
                                                                            )
                                                                        }
                                                                    >
                                                                        <span className="">
                                                                            <FaEdit className="text-[1.2rem]" />
                                                                        </span>
                                                                        <p>
                                                                            Grade
                                                                            {submission.grade && (
                                                                                <span>
                                                                                    :{" "}
                                                                                    {
                                                                                        submission.grade
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full px-5">
                                                            {
                                                                submission.submissionLink
                                                            }
                                                        </div>
                                                        <div className="w-full justify-end"></div>
                                                    </div>
                                                    <AnimatePresence>
                                                        {openFeedbackBoxArray.includes(
                                                            submission.submissionId
                                                        ) && (
                                                            <motion.div
                                                                initial={{
                                                                    y: -100,
                                                                    opacity: 0,
                                                                }}
                                                                whileInView={{
                                                                    y: 0,
                                                                    opacity: [
                                                                        0, 0,
                                                                        0.5, 1,
                                                                    ],
                                                                }}
                                                                exit={{
                                                                    y: -100,
                                                                    opacity: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.4,
                                                                    ease: "linear",
                                                                }}
                                                                viewport={{
                                                                    once: true,
                                                                }}
                                                                className="min-h-[250px] w-4/5 border-[1px] border-gray-300 bg-white self-end"
                                                            >
                                                                <div className="w-full mt-3 px-3 text-gray-600 flex justify-between border-b-[1px] border-gray-300">
                                                                    <div className="mb-3 flex gap-1">
                                                                        <p className="font-bold text-black">
                                                                            {
                                                                                user?.userName
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            on{" "}
                                                                            <span>
                                                                                {dayjs(
                                                                                    Date.now()
                                                                                ).format(
                                                                                    "YYYY-MM-DD HH:mm:ss"
                                                                                )}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex gap-4">
                                                                        <p className="flex items-start gap-2 transition-opacity duration-300 hover:opacity-60 cursor-pointer"></p>
                                                                        <p className="flex items-start gap-2">
                                                                            <p>
                                                                                Grade:{" "}
                                                                            </p>
                                                                            <Input
                                                                                value={
                                                                                    grade.length >
                                                                                    0
                                                                                        ? grade
                                                                                        : submission.grade
                                                                                }
                                                                                type="number"
                                                                                className="p-0 px-2 w-[60px]"
                                                                                onChange={
                                                                                    handleChange
                                                                                }
                                                                            />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full h-[130px] px-3 my-3">
                                                                    <TextEditor
                                                                        content={
                                                                            content.length >
                                                                            0
                                                                                ? content
                                                                                : submission.feedback
                                                                        }
                                                                        onContentChange={
                                                                            setContent
                                                                        }
                                                                        className="h-[100px]"
                                                                    />
                                                                </div>
                                                                <div className="w-full mt-5 px-3 flex justify-end">
                                                                    <Button
                                                                        loading={
                                                                            saveLoading
                                                                        }
                                                                        variant="solid"
                                                                        color="purple"
                                                                        onClick={() =>
                                                                            handleSaveGradeAndFeedback(
                                                                                submission.submissionId
                                                                            )
                                                                        }
                                                                    >
                                                                        Save
                                                                    </Button>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="w-full text-center text-gray-600 text-[1rem]">
                                            No Submissions
                                        </div>
                                    )
                                ) : (
                                    <Table
                                        columns={[
                                            {
                                                key: "studentId",
                                                dataIndex: "studentId",
                                                title: "Student ID",
                                            },
                                            {
                                                key: "studentName",
                                                dataIndex: "studentName",
                                                title: "Full Name",
                                            },
                                            {
                                                key: "studentEmail",
                                                dataIndex: "studentEmail",
                                                title: "Email",
                                            },
                                        ]}
                                        dataSource={studentsNotSubmitted}
                                        pagination={false}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <SpinnerLoading />
                    )
                ) : (
                    <></>
                )}

                {/* Modal create new assignment */}
                <Modal
                    title={<h1 className="text-2xl">Create new assignment</h1>}
                    open={createModalVisible}
                    onCancel={() => setCreateModalVisible(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmitCreateForm}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter title !",
                                },
                            ]}
                        >
                            <Input placeholder="Enter assignment title" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter description !",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={5}
                                placeholder="Enter assignment description"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Due Date"
                            name="dueDate"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter due date !",
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={modalLoading}
                                variant="solid"
                                type="primary"
                                htmlType="submit"
                            >
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Modal edit new assignment */}
                <Modal
                    title={<h1 className="text-2xl">Edit new assignment</h1>}
                    open={editModalVisible}
                    onCancel={() => {
                        setEditModalVisible(false);
                        setSelectedAssignment(null);
                    }}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handelSubmitEditForm}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter title !",
                                },
                            ]}
                        >
                            <Input placeholder="Enter assignment title" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter description !",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={5}
                                placeholder="Enter assignment description"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Due Date"
                            name="dueDate"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter due date !",
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={modalLoading}
                                variant="solid"
                                type="primary"
                                htmlType="submit"
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Modal confirm delete  */}
                <Modal
                    open={deleteModalVisible}
                    onCancel={() => setDeleteModalVisible(false)}
                    okText="Confirm"
                    onOk={() =>
                        handleDeleteAssignment(
                            selectedAssignment.assignmentId as number
                        )
                    }
                >
                    <p className="flex gap-2">
                        <ExclamationCircleIcon className="w-6 h-6 text-orange-400" />
                        Are you sure ?
                    </p>
                </Modal>
            </div>
        </>
    );
};

export default MyCourseDetail;
