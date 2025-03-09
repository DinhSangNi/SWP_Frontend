import TextEditor from "@/components/TextEditor";
import {
    getAssignmentSubmission,
    gradeSubmission,
} from "@/services/assignmentsService";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { Button, Input } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";

const AssignmentSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [content, setContent] = useState<string | undefined>();
    const [grade, setGrade] = useState<string>("");
    const [openFeedbackBoxArray, setOpenFeedbackBoxArray] = useState<number[]>(
        []
    );
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // const [searchParams] = useSearchParams();
    // const assignmentId = searchParams.get("assignmentId");

    const { assignmentId } = useParams();

    const user = useSelector((state: RootState) => state.auth.user);

    const fetchSubminssions = async () => {
        if (!assignmentId) {
            console.log("here");

            return;
        }
        try {
            const response = await getAssignmentSubmission(assignmentId!);
            if (response.status === 200) {
                setSubmissions(response.data.$values);
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
        fetchSubminssions();
    }, [assignmentId]);

    console.log("submissions :", submissions);
    console.log("grade :", grade);
    console.log("content :", content);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrade(e.target.value);
    };

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
    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div>
                    <CustomBreadCrumb />
                </div>
                <div className="h-1/4 gap-4">
                    <div className="w-full flex items-center justify-between">
                        <div className="">
                            <div className="py-8 text-3xl font-bold">
                                <h1>Assignments Submissions Management</h1>
                            </div>
                        </div>
                    </div>

                    {/* Search Form */}
                    <div className="mb-10 w-full flex items-center justify-start gap-4">
                        <Input
                            allowClear
                            className="w-[25%] rounded-3xl hover:border-[#6d28d2] focus-within:border-[#6d28d2]"
                            prefix={<IoMdSearch className="text-[1.5rem]" />}
                            // onChange={handleSearch}
                            // value={query}
                            size="large"
                        />
                    </div>
                </div>

                <div className="w-full h-3/4 overflow-y-scroll">
                    {submissions.map((submission: any) => {
                        return (
                            <div
                                key={submission.submissionId}
                                className="w-full flex flex-col gap-4 mb-5"
                            >
                                <div className="min-h-[250px] border-[1px] border-gray-300">
                                    <div className="w-full mt-3 px-3 text-gray-600 flex justify-between border-b-[1px] border-gray-300">
                                        <div className="mb-3 flex gap-1">
                                            <p className="font-bold text-black">
                                                {submission.studentName}
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
                                            {/* <p
                                                className="flex items-start gap-2 transition-opacity duration-300 hover:opacity-60 cursor-pointer"
                                                onClick={() =>
                                                    setIsFeedback(!isFeedback)
                                                }
                                            >
                                                <span>
                                                    <MdFeedback className="text-[1.2rem]" />
                                                </span>
                                                <p>Feedback</p>
                                            </p> */}
                                            <div className="flex items-start gap-2">
                                                <div
                                                    className="flex items-start gap-2 transition-opacity duration-300 hover:opacity-60 cursor-pointer"
                                                    onClick={() =>
                                                        handleOpenFeedBackBox(
                                                            submission.submissionId
                                                        )
                                                    }
                                                >
                                                    <span>
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
                                        {submission.submissionLink}
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
                                                opacity: [0, 0, 0.5, 1],
                                            }}
                                            exit={{
                                                y: -100,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                ease: "linear",
                                            }}
                                            className="min-h-[250px] w-4/5 border-[1px] border-gray-300 self-end"
                                        >
                                            <div className="w-full mt-3 px-3 text-gray-600 flex justify-between border-b-[1px] border-gray-300">
                                                <div className="mb-3 flex gap-1">
                                                    <p className="font-bold text-black">
                                                        {user?.userName}
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
                                                        {/* <span>
                                                            <FaEdit className="text-[1.2rem] transition-opacity duration-300 hover:opacity-60 cursor-pointer" />
                                                        </span> */}
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
                                                        {!submission.grade && (
                                                            <Input
                                                                type="number"
                                                                className="p-0 px-2 w-[60px]"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-full h-[130px] px-3 my-3">
                                                <TextEditor
                                                    content={content}
                                                    onContentChange={setContent}
                                                    className="h-[100px]"
                                                />
                                            </div>
                                            <div className="w-full mt-5 px-3 flex justify-end">
                                                <Button
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
                    })}
                </div>
            </div>
        </>
    );
};

export default AssignmentSubmissions;
