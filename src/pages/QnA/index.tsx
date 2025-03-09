import { submitQnA, viewAllQnA } from "@/services/q&aService";
import { PaginationType } from "@/stores/types";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { randomHexColor } from "@/utils/formatUtils";
import { Button, Form, Input, Modal, Pagination } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {};

const QnA = (props: Props) => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [paginatedQuestions, setPaginatedQuestions] = useState<any[]>([]);
    const [isOpenCreateQuestionModal, setIsOpenCreateQuestionModal] =
        useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllQuestions = async () => {
            try {
                const response = await viewAllQnA();
                if (response.status === 200 || response.status === 201) {
                    setQuestions(response.data.$values);
                }
            } catch (error: any) {
                console.log("error: ", error);
                if (error.status === 401) {
                    handleWhenTokenExpire();
                    navigate("/login");
                }
            }
        };

        fetchAllQuestions();
    }, []);

    const handlePaginatedQuestions = (questions: any) => {
        const indexOfLastItem = pagination.currentPage * pagination.pageSize;
        const indexOfFirstItem = indexOfLastItem - pagination.pageSize;
        const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
        return currentItems;
    };

    useEffect(() => {
        if (questions.length > 0) {
            const paginatedQuestions = handlePaginatedQuestions(questions);
            setPaginatedQuestions(paginatedQuestions);
        }
    }, [questions, pagination]);

    const handleSubmitQnA = async (credentials: any) => {
        try {
            const response = await submitQnA({
                title: credentials.title,
                content: credentials.content,
            });
            if (response.status === 200 || response.status === 201) {
                toast.success("Submit successfully !");
            }
        } catch (error: any) {
            console.log("error: ", error);
            toast.error("Submit failed !");
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    console.log(questions.length);

    return (
        <>
            <div className="w-mainContent mx-auto">
                <div className="my-5 w-full flex justify-between">
                    <h1 className="text-3xl">Q&A</h1>
                    <Button
                        className="font-bold"
                        onClick={() => setIsOpenCreateQuestionModal(true)}
                    >
                        Post Question
                    </Button>
                </div>
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
                <div className="mb-7">
                    {paginatedQuestions.map((question) => {
                        const randomBackground = `#${randomHexColor()}`;
                        return (
                            <div
                                className="flex items-center justify-between gap-5 px-5 border-[1px] border-gray-200 transition-colors duration-300 hover:border-purple-500 hover:bg-white cursor-pointer"
                                onClick={() =>
                                    navigate(`/Qna/${question.questionId}`)
                                }
                            >
                                <div className="flex items-center gap-5">
                                    <div className="">
                                        <div
                                            style={{
                                                backgroundColor:
                                                    randomBackground,
                                            }}
                                            className="w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-full text-white"
                                        >
                                            <p>{question.createdBy[0]}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-[1.1rem]">
                                            {question.title}
                                        </h1>
                                        <div className="text-[0.8rem] text-gray-500">
                                            <p>{question.createdBy}</p>
                                            <p>
                                                {dayjs(
                                                    question.createdAt
                                                ).format("DD/MM/YYYY")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[85px] flex justify-start">
                                    <p>
                                        Answers:{" "}
                                        <span>
                                            {question.answers.$values.length}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div className="w-full flex justify-end mt-3">
                        <Pagination
                            total={questions.length}
                            current={pagination.currentPage}
                            pageSize={pagination.pageSize}
                            showSizeChanger={true}
                            pageSizeOptions={["5", "10", "20"]}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    open={isOpenCreateQuestionModal}
                    footer={null}
                    closable
                    onCancel={() => setIsOpenCreateQuestionModal(false)}
                >
                    <div>
                        <Form layout="vertical" onFinish={handleSubmitQnA}>
                            <Form.Item
                                label={<p className="text-xl">Title:</p>}
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input title",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter title"
                                    className="hover:border-purple-400 focus-within:border-purple-400 focus-within:shadow-none"
                                />
                            </Form.Item>
                            <Form.Item
                                label={<p className="text-xl">Content:</p>}
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input content",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter content"
                                    className="hover:border-purple-400 focus-within:border-purple-400 focus-within:shadow-none"
                                />
                            </Form.Item>
                            <Form.Item className="justify-self-end">
                                <Button
                                    className="font-bold mt-5"
                                    variant="outlined"
                                    color="purple"
                                    htmlType="submit"
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default QnA;
