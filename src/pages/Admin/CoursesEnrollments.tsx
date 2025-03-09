import {
    confirmCourseEnrollment,
    getCourseEnrollments,
} from "@/services/courseService";
import { PaginationType } from "@/stores/types";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CoursesEnrollments = () => {
    const [dataList, setDataList] = useState<[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 5,
    });

    const navigate = useNavigate();

    const fetchCoursesEnrollments = async () => {
        try {
            setLoading(true);
            const response = await getCourseEnrollments("Pending");
            if (response.status === 200) {
                setDataList(response.data.$values);
                fetchCoursesEnrollments();
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                toast.error("Your token expired! Please re-authenticate!");
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (
        courseId: string | number,
        studentId: string | number
    ) => {
        try {
            setConfirmLoading(true);
            const response = await confirmCourseEnrollment(courseId, studentId);
            if (response.status === 200) {
                toast.success("Approved Successfully!");
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                toast.error("Your token expired! Please re-authenticate!");
                navigate("/login");
            }
        } finally {
            setConfirmLoading(true);
        }
    };

    // Pagination Function
    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    useEffect(() => {
        fetchCoursesEnrollments();
    }, []);

    return (
        <>
            <div className="w-full">
                <div className="w-full py-8">
                    <h1 className="text-3xl font-bold">Course Enrollments</h1>
                </div>
                <div>
                    <Table
                        scroll={{ y: 460 }}
                        columns={[
                            {
                                title: "ID",
                                key: "$id",
                                dataIndex: "$id",
                            },
                            {
                                title: "Student Name",
                                key: "studentName",
                                dataIndex: "studentName",
                            },
                            {
                                title: "Email",
                                key: "email",
                                dataIndex: "email",
                            },
                            {
                                title: "Course Name",
                                key: "courseName",
                                dataIndex: "courseName",
                            },
                            {
                                title: "Status",
                                key: "status",
                                dataIndex: "status",
                                render: () => {
                                    return (
                                        <div className="text-red-600">
                                            Pending
                                        </div>
                                    );
                                },
                            },
                            {
                                title: "Actions",
                                key: "actions",
                                dataIndex: "actions",
                                render: (_: any, record: any) => {
                                    return (
                                        <div className="flex justify-start gap-3">
                                            <Button
                                                color="green"
                                                variant="solid"
                                                loading={confirmLoading}
                                                onClick={() => {
                                                    handleConfirm(
                                                        record.courseId,
                                                        record.studentId
                                                    );
                                                }}
                                            >
                                                Approve
                                            </Button>
                                        </div>
                                    );
                                },
                            },
                        ]}
                        loading={loading}
                        dataSource={dataList as []}
                        pagination={{
                            current: pagination.currentPage,
                            pageSize: pagination.pageSize,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "20"],
                            onChange: handlePageChange,
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default CoursesEnrollments;
