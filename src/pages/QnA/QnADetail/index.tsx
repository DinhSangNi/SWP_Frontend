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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {};

const QnADetail = (props: Props) => {
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
    const [content, setContent] = useState<string>("");

    const { id } = useParams();
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const fetchQuestionById = async () => {
        try {
            const response = await viewAllQnAById(id!);
            if (response.status === 200 || response.status === 201) {
                setQuestion(response.data);
            }
        } catch (error: any) {}
    };

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

    return (
        <>
            <div className="w-mainContent mx-auto bg-transparent">
                <div className="py-5">
                    <div className="flex gap-5 items-end ">
                        <h1 className="text-3xl font-bold">Q&A</h1>
                        <p className="text-2xl">{question?.title}</p>
                    </div>
                    <div className="flex gap-2 text-[1rem]">
                        <p>{question?.createdBy}</p>
                        <p>{dayjs(question?.createdAt).format("DD/MM/YYYY")}</p>
                    </div>
                </div>

                <div>
                    <div className="w-full mb-5 flex border-[1px] border-gray-200 bg-white">
                        <div className="w-1/5 min-h-[250px] py-3 flex flex-col items-center border-r-[1px] border-gray-200">
                            <div className="w-[6rem] h-[6rem] mb-3 flex justify-center items-center rounded-full text-white bg-black">
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
                            {/* <div className="w-full justify-items-end py-3">
                                <p
                                    className="hover:underline text-[0.9rem] text-purple-600"
                                    // onClick={handleAnswer}
                                >
                                    Answer
                                </p>
                            </div> */}
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="w-full mb-5 flex justify-between">
                        <div className="text-2xl font-bold">
                            Answers of teachers
                        </div>
                        <div className="w-[12%] bg-white text-center py-1 font-bold border-[1px] border-gray-200 transition-color duration-300 hover:text-purple-600 hover:border-purple-600 cursor-pointer">
                            Sort by Dates
                        </div>
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
                                    onClick={() => handleAnswer(content)}
                                >
                                    <p className="hover:underline text-[0.9rem] text-purple-600">
                                        Answer
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {question?.answers.$values.map((answer: any) => {
                        return (
                            <>
                                <QnACard
                                    answer={answer}
                                    type="Answer"
                                    user={user}
                                    onComment={handleComment}
                                />

                                {/* Comments */}
                                {/* {answer.comments.$values.map((comment: any) => {
                                    return (
                                        <QnACard
                                            type="Comment"
                                            content={comment.content}
                                            createdBy={comment.commentedBy}
                                            createdAt={comment.commentedAt}
                                        />
                                    );
                                })} */}
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default QnADetail;
