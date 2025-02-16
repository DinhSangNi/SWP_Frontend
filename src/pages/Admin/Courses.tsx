import { Button, Space, Table, Tag, Modal } from "antd";
import { PaginationType } from "@/stores/types";
import { useEffect, useState } from "react";
import ModalCustomer from "@/components/Modal";
import { getAllUser, getUserById, updateUser } from "@/services/userService";
import { toast } from "react-toastify";
import { deleteCourse, getAllCourses, getCourseById } from "@/services/courseService";
import ModalCreateCourse from "@/components/ModalCreateCourse";

type Props = {
    type: string;
};

const Courses = ({ type }: Props) => {
    const [dataCourse, setDataCourse] = useState([]); // State lưu danh sách giáo viên
    const [loading, setLoading] = useState(false); // State loading
    const [detailModalVisible, setDetailModalVisible] = useState(false); // State để hiển thị modal chi tiết
    const [selectedCourse, setSelectedCourse] = useState(null); // State lưu thông tin chi tiết của người dùng
    const [reload, setReload] = useState(false);


    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });

    const handleReload = () => {
        setReload(!reload);
    }

    // Hàm fetch dữ liệu người dùng
    const fetchData = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await getAllCourses();
            setDataCourse(response);
            toast.success(`Fetched ${type} successfully!`);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    // Gọi API khi component được mount
    useEffect(() => {
        fetchData();
    }, [reload]);


    // Hàm xử lý khi nhấn nút "Detail"
    const handleDetailClick = async (userId) => {
        console.log('courseId', userId);
        try {
            const courseDetail = await getCourseById(userId); // Gọi API lấy thông tin chi tiết
            setSelectedCourse(courseDetail); // Lưu thông tin chi tiết vào state
            setDetailModalVisible(true); // Hiển thị modal
        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Failed to fetch user details.");
        }
    };

    // Hàm xóa course
    const handleDelete = async (courseId) => {
        console.log('courseId', courseId);
        try {
            await deleteCourse
            toast.success("Deleted course successfully!");
            fetchData();
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete course.");
        }
    }

    // Hàm xử lý phân trang
    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    return (
        <div className="w-full overflow-y-scroll">
            <div className="w-full">
                <div className="py-10 text-3xl font-bold">
                    <h1>{type} Management</h1>
                </div>
            </div>

            <div className="flex justify-end mb-5">
                <ModalCreateCourse reload={handleReload} />
            </div>

            <Table
                columns={[
                    {
                        title: "ID",
                        dataIndex: "courseId",
                        key: "id",
                    },
                    {
                        title: "courseName",
                        dataIndex: "courseName",
                        key: "FullName",
                    },
                    {
                        title: "Description",
                        dataIndex: "description",
                        key: "email",
                    },
                    {
                        title: "Action",
                        key: "action",
                        render: (_, record) => (
                            <Space size="middle">
                                <Button
                                    type="primary"
                                    onClick={() => handleDetailClick(record.courseId)} // Gọi hàm khi nhấn nút Detail
                                >
                                    Detail
                                </Button>
                                <Button type="primary" danger
                                    onClick={() => handleDelete(record.coursedId)}>
                                    Delete
                                </Button>
                            </Space>
                        ),
                    },
                ]}
                dataSource={dataCourse}
                loading={loading}
                className="w-full"
                pagination={{
                    current: pagination.currentPage,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    onChange: handlePageChange,
                }}
            />

            {/* Modal hiển thị thông tin chi tiết */}
            <Modal
                title="Course Details"
                visible={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={null}
            >
                {selectedCourse && (
                    <div>
                        <p><strong>ID:</strong> {selectedCourse.courseId || 0}</p>
                        <p><strong>Full Name:</strong> {selectedCourse.courseName}</p>
                        <p><strong>Email:</strong> {selectedCourse.description}</p>
                        {/* Thêm các trường thông tin khác nếu cần */}
                    </div>
                )}
            </Modal>


        </div>
    );
};

export default Courses;