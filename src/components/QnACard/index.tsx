import dayjs from "dayjs";
import { useState } from "react";
import TextEditor from "../TextEditor";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    answer: any;
    type?: "Answer" | "Question";
    user?: any;
    onAnswer?: (content: string) => void;
    onComment?: (content: string, answerId: number) => void;
};

const QnACard = ({ answer, type, user, onAnswer, onComment }: Props) => {
    const [contentOfTextEditor, setContentOfTextEditor] = useState<string>("");
    const [isOpenTextEditor, setIsOpenTextEditor] = useState<boolean>(false);

    console.log("comment: ", answer);

    return (
        <>
            <div className="w-full flex border-[1px] border-gray-300 my-5 bg-white">
                <div className="w-1/5 min-h-[250px] py-3 flex flex-col items-center border-r-[1px] border-gray-300">
                    <div className="w-[6rem] h-[6rem] text-3xl mb-3 flex justify-center items-center rounded-full text-white bg-black">
                        {answer.answeredBy[0]}
                    </div>
                    <p>{answer.answeredBy}</p>
                </div>
                <div className="px-6 w-4/5 flex flex-col">
                    <p className="w-full py-3 border-b-[1px] border-gray-300">
                        {dayjs(answer.createdAt).format("DD/MM/YYYY")}
                    </p>
                    <div className="py-5 flex-1">
                        <p>{answer.content}</p>
                    </div>
                    {type === "Question" ? (
                        <div
                            className="w-full justify-items-end py-3"
                            onClick={() => onAnswer!(contentOfTextEditor)}
                        >
                            <p className="hover:underline text-[0.9rem] text-purple-600">
                                Answer
                            </p>
                        </div>
                    ) : (
                        <div
                            className="w-full justify-items-end py-3"
                            onClick={() =>
                                setIsOpenTextEditor(!isOpenTextEditor)
                            }
                        >
                            <p className="hover:underline text-[0.9rem] text-purple-600">
                                Answer
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <AnimatePresence>
                {isOpenTextEditor && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 250, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, ease: "linear" }}
                        className={`w-5/6 justify-self-end flex border-[1px] border-gray-300 bg-white`}
                    >
                        <div className="w-1/5 min-h-[250px] py-3 flex flex-col items-center border-r-[1px] border-gray-300">
                            <div className="w-[6rem] h-[6rem] text-3xl mb-3 flex justify-center items-center rounded-full text-white bg-primary-purple">
                                {user.userName[0]}
                            </div>
                            <p>{user.userName}</p>
                        </div>
                        <div className="px-6 w-4/5 flex flex-col">
                            <div className="h-5/6 mt-3">
                                <TextEditor
                                    className="w-full h-3/5"
                                    content={contentOfTextEditor}
                                    onContentChange={setContentOfTextEditor}
                                />
                            </div>
                            <div
                                className="w-full justify-items-end"
                                onClick={() =>
                                    onComment!(
                                        contentOfTextEditor,
                                        answer.answerId!
                                    )
                                }
                            >
                                <p className="hover:underline text-[0.9rem] text-purple-600">
                                    Answer
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Comments */}
            <div>
                {answer.comments.$values.map((comment: any) => {
                    return (
                        <div className="w-5/6 justify-self-end flex border-[1px] border-gray-300 my-5 bg-white">
                            <div className="w-1/5 min-h-[250px] py-3 flex flex-col items-center border-r-[1px] border-gray-300">
                                <div className="w-[6rem] h-[6rem] text-3xl mb-3 flex justify-center items-center rounded-full text-white bg-black">
                                    {comment.commentedBy[0]}
                                </div>
                                <p>{comment.commentedBy}</p>
                            </div>
                            <div className="px-6 w-4/5 flex flex-col">
                                <p className="w-full py-3 border-b-[1px] border-gray-300">
                                    {dayjs(comment.createdAt).format(
                                        "DD/MM/YYYY"
                                    )}
                                </p>
                                <div className="py-5 flex-1">
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default QnACard;
