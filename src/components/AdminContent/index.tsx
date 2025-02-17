import { Button, Space, Table, Tag } from "antd";
import { PaginationType } from "@/stores/types";

import { useEffect, useState } from "react";
import { courseEnrollmentsData, coursesData } from "@/services/fakeData";
import ModalCustomer from "../Modal";
import { getAllUser } from "@/services/userService";

type Props = {
    type: string;
};

const AdminContent = ({ type }: Props) => {

    const [dataTeacher, setDataTeacher] = useState([]); // State lưu danh sách giáo viên
    const [dataStudent, setDataStudent] = useState([]); // State lưu danh sách học sinh
    const [loading, setLoading] = useState(false); // State loading
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });

    // Hàm fetch dữ liệu người dùng
    const fetchData = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await getAllUser(); // Gọi API lấy danh sách người dùng
            console.log("Response from server:", response);

            // Lọc danh sách giáo viên
            const teachers = response.filter(user => user.role === "Teacher");
            console.log("Teachers:", teachers);
            setDataTeacher(teachers);

            // Lọc danh sách học sinh
            const students = response.filter(user => user.role === "Student");
            console.log("Students:", students);
            setDataStudent(students);

        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    // Gọi API khi component được mount
    useEffect(() => {
        fetchData();
    }, []);

    // Hàm xử lý phân trang
    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    // Xác định dataSource dựa trên type
    const getDataSource = () => {
        switch (type) {
            case "Teacher":
                return dataTeacher;
            case "Student":
                return dataStudent;
            case "Courses":
                return coursesData;
            case "CoursesEnrollments":
                return courseEnrollmentsData;
            default:
                return [];
        }
    };

    return (
        <div className="w-full overflow-y-scroll">
            <div className="w-full">

                <div className="py-10 text-3xl font-bold">
                    <h1>{type} Management</h1>
                </div>
            </div>

            <div className="flex justify-end mb-5">
                <ModalCustomer />
            </div>

            <Table
                columns={
                    type === "CoursesEnrollments"
                        ? [

                            // Các cột cho CoursesEnrollments
                        ]
                        : type === "Courses"
                            ? [
                                // Các cột cho Courses
                            ]
                            : [
                                // Các cột cho Teacher/Student
                                {
                                    title: "ID",
                                    dataIndex: "id",
                                    key: "id",
                                },
                                {
                                    title: "Fullname",
                                    dataIndex: "fullname",
                                    key: "fullname",
                                },
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                    key: "email",
                                },
                                {
                                    title: "Phone Number",
                                    dataIndex: "phoneNumber",
                                    key: "phoneNumber",
                                },
                                {
                                    title: "Status",
                                    key: "status",
                                    dataIndex: "status",
                                    render: (status) => (

                                        <Tag color={status === "inActive" ? "red" : "green"}>
                                            {status}
                                        </Tag>
                                    ),
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: () => (
                                        <Space size="middle">

                                            <Button variant="solid" color="orange">
                                                Detail
                                            </Button>
                                            <Button variant="solid" color="danger">
                                                Delete
                                            </Button>
                                        </Space>
                                    ),
                                },
                            ]
                }

                dataSource={getDataSource()} // Sử dụng hàm getDataSource để chọn dữ liệu phù hợp
                loading={loading} // Hiển thị loading khi đang fetch dữ liệu
                className="w-full"
                pagination={{
                    current: pagination.currentPage,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],

                    onChange: handlePageChange,
                }}
            />
        </div>
    );
};


export default AdminContent;
