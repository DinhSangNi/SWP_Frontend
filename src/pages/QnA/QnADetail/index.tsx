import QnACard from "@/components/QnACard";
import TextEditor from "@/components/TextEditor";
import {
    answerAllQnAById,
    commentAAnswer,
    viewAllQnAById,
} from "@/services/q&aService";
import { RootState } from "@/stores/store";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import SpinnerLoading from "@/components/SpinnerLoading";

const QnADetail = () => {
    const [question, setQuestion] = useState<
        | {
              questionId: number | string;
              title: string;
              content: string;
              createdBy: string;
              createdAt: string;
              answers: {
                  $values: [];
              };
          }
        | undefined
    >();
    const [sortByIncrease, setSortByIncrease] = useState<boolean>(true);
    const [questionLoading, setQuestionLoading] = useState<boolean>(false);

    const [content, setContent] = useState<string>("");

    const { id } = useParams();
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    // Animation
    const arrowRotateEffect = useAnimation();

    const fetchQuestionById = async () => {
        try {
            setQuestionLoading(true);
            const response = await viewAllQnAById(id!);
            if (response.status === 200 || response.status === 201) {
                setQuestion(response.data);
            }
        } catch (error: any) {
            console.log("error: ", error);
        } finally {
            setQuestionLoading(false);
        }
    };

    useEffect(() => {
        arrowRotateEffect.start(
            !sortByIncrease ? { rotate: 0 } : { rotate: 180 },
            {
                ease: "linear",
                duration: 0.3,
            }
        );

        return () => {
            arrowRotateEffect.stop();
        };
    }, [sortByIncrease, arrowRotateEffect]);

    useEffect(() => {
        fetchQuestionById();
    }, []);

    const handleAnswer = async (content: string) => {
        try {
            const response = await answerAllQnAById({
                content: content,
                questionId: id,
            });
            if (response.status === 200 || response.status === 201) {
                toast.success("Answer Successfully !");
                fetchQuestionById();
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    const handleComment = async (content: string, answerId: number) => {
        try {
            const response = await commentAAnswer({
                content: content,
                answerId: answerId,
            });
            if (response.status === 200 || response.status === 201) {
                toast.success("Comment successfully !");
                fetchQuestionById();
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    const handleSortByDate = () => {
        if (question) {
            const sortedQuestion = {
                ...question,
                answers: {
                    ...question.answers,
                    $values: question.answers.$values.sort((a: any, b: any) => {
                        const date1 = new Date(a.createdAt);
                        const date2 = new Date(b.createdAt);

                        return !sortByIncrease
                            ? date1.getTime() - date2.getTime()
                            : date2.getTime() - date1.getTime();
                    }),
                },
            };
            setQuestion(sortedQuestion);
            setSortByIncrease(!sortByIncrease);
        }
    };

    console.log("sortByIncrease: ", sortByIncrease);

    return (
        <>
            <div className="w-mainContent mx-auto bg-transparent">
                {!questionLoading ? (
                    <>
                        <div className="py-5">
                            <div className="flex gap-5 items-end ">
                                <h1 className="text-3xl font-bold">Q&A</h1>
                                <p className="text-2xl">{question?.title}</p>
                            </div>
                            <div className="flex gap-2 text-[1rem]">
                                <p>{question?.createdBy}</p>
                                <p>
                                    {dayjs(question?.createdAt).format(
                                        "DD/MM/YYYY"
                                    )}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="w-full mb-5 flex border-[1px] border-gray-200 bg-white">
                                <div className="w-1/5 min-h-[250px] py-3 flex flex-col items-center border-r-[1px] border-gray-200">
                                    <div className="w-[6rem] h-[6rem] text-3xl mb-3 flex justify-center items-center rounded-full text-white bg-black">
                                        {question?.createdBy[0]}
                                    </div>
                                    <p>{question?.createdBy}</p>
                                </div>
                                <div className="px-6 w-4/5 flex flex-col">
                                    <p className="w-full py-3 border-b-[1px] border-gray-200">
                                        {dayjs(question?.createdAt).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </p>
                                    <div className="py-5 flex-1">
                                        <p>{question?.content}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mb-5 flex justify-between">
                                <div className="text-2xl font-bold">
                                    Answers of teachers
                                </div>

                                {/* Sort */}
                                <button
                                    className="w-[12%] flex items-center justify-center gap-1 bg-white text-center py-1 font-bold border-[1px] border-gray-200 transition-color duration-300 hover:text-purple-600 hover:border-purple-600 cursor-pointer"
                                    onClick={handleSortByDate}
                                >
                                    Sort by Dates{" "}
                                    <motion.div
                                        initial={{ rotate: 180 }}
                                        animate={arrowRotateEffect}
                                    >
                                        <FaArrowDownLong className="text-[1rem]" />
                                    </motion.div>
                                </button>
                            </div>

                            {/* Answer */}
                            {!(user?.role === "Student") && (
                                <div className="w-full mb-5 flex border-[1px] border-gray-200 bg-white">
                                    <div className="w-1/5 min-h-[250px] py-3 flex flex-col items-center border-r-[1px] border-gray-300">
                                        <div className="w-[6rem] h-[6rem] text-3xl mb-3 flex justify-center items-center rounded-full text-white bg-primary-purple">
                                            {user?.userName[0]}
                                        </div>
                                        <p>{user?.userName}</p>
                                    </div>
                                    <div className="px-6 w-4/5 flex flex-col">
                                        <div className="h-5/6 mt-3">
                                            <TextEditor
                                                className="w-full h-3/5"
                                                content={content}
                                                onContentChange={setContent}
                                            />
                                        </div>
                                        <div
                                            className="w-full justify-items-end"
                                            onClick={() =>
                                                handleAnswer(content)
                                            }
                                        >
                                            <p className="hover:underline text-[0.9rem] text-purple-600">
                                                Answer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {question &&
                                (question?.answers.$values.length > 0 ? (
                                    question?.answers.$values.map(
                                        (answer: any) => {
                                            return (
                                                <>
                                                    <QnACard
                                                        answer={answer}
                                                        type="Answer"
                                                        user={user}
                                                        onComment={
                                                            handleComment
                                                        }
                                                    />
                                                </>
                                            );
                                        }
                                    )
                                ) : (
                                    <p className="py-5 text-center text-gray-600">
                                        No Answers
                                    </p>
                                ))}
                        </div>
                    </>
                ) : (
                    <SpinnerLoading />
                )}
            </div>
        </>
    );
};

export default QnADetail;
