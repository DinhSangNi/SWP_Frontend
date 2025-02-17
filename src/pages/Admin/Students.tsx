import { Button, Space, Table, Tag, Modal } from "antd";
import { PaginationType } from "@/stores/types";
import { useEffect, useState } from "react";
import ModalCustomer from "@/components/Modal";
import { getAllUser, getUserById, updateUser } from "@/services/userService";
import { toast } from "react-toastify";

type Props = {
    type: string;
};

const Student = ({ type }: Props) => {
    const [dataStudent, setDataStudent] = useState([]); // State lưu danh sách học sinh
    const [loading, setLoading] = useState(false); // State loading
    const [reload, setReload] = useState(false); // State để reload dữ liệu
    

    const [detailModalVisible, setDetailModalVisible] = useState(false); // State để hiển thị modal chi tiết
    const [selectedUser, setSelectedUser] = useState(null); // State lưu thông tin chi tiết của người dùng


    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });

    // Hàm fetch dữ liệu người dùng
    const fetchData = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await getAllUser(); // Gọi API lấy danh sách người dùng
            // console.log("Response from server:", response);

            const students = response.filter(user => user.role === "Student");
            console.log("Students:", students);
            setDataStudent(students);

        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };


    // Hàm xử lý khi nhấn nút "Detail"
    const handleDetailClick = async (userId) => {
        try {
            const userDetail = await getUserById(userId) // Gọi API lấy thông tin chi tiết
            setSelectedUser(userDetail); // Lưu thông tin chi tiết vào state
            setDetailModalVisible(true); // Hiển thị modal

        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Failed to fetch user details.");
        }
    };


    // Hàm xử lý khi nhấn vào Tag "Status"
    const handleStatusClick = async (userId, currentStatus) => {
        try {
            const newStatus = currentStatus === "Active" ? "Inactive" : "Active"; // Đảo ngược trạng thái
            const updatedData = { status: newStatus }; // Dữ liệu cập nhật

            const response = await updateUser(userId, updatedData); // Gọi API cập nhật trạng thái
            if (response) {
                toast.success(`✅ Cập nhật trạng thái thành công!`);
                fetchData(); // Fetch lại dữ liệu để cập nhật giao diện
            } else {
                toast.error("❌ Cập nhật trạng thái thất bại.");
            }
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật trạng thái:", error);
            toast.error("❌ Lỗi khi cập nhật trạng thái.");
        }
    };

    // Hàm xử lý phân trang
    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    const handleReload = () => {
        setReload(!reload);
    }



    const LocalizedModal = () => {
        const [open, setOpen] = useState(false);

        const showModal = () => {
            setOpen(true);
        };

        const hideModal = () => {
            setOpen(false);
        };

        return (
            <>
                <Button type="primary" onClick={showModal}>
                    Modal
                </Button>
                <Modal
                    title="Modal"
                    open={open}
                    onOk={hideModal}
                    onCancel={hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                </Modal>
            </>
        );
    };

    // Gọi API khi component được mount
    useEffect(() => {
        fetchData();
    }, [reload]);

    return (
        <div className="w-full overflow-y-scroll">
            <div className="w-full">
                <div className="py-10 text-3xl font-bold">
                    <h1>{type} Management</h1>
                </div>
            </div>

            <div className="flex justify-end mb-5">
                <ModalCustomer type={"student"} reload={handleReload} />
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
                                    dataIndex: "idUser",
                                    key: "id",
                                },
                                {
                                    title: "Fullname",
                                    dataIndex: "fullName",
                                    key: "fullname",
                                },
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                    key: "email",
                                },
                                {
                                    title: "Status",
                                    key: "status",
                                    dataIndex: "status",
                                    render: (status, record) => (
                                        <Tag
                                            color={status === "Active" ? "green" : "red"}
                                            onClick={() => handleStatusClick(record.idUser, status)} // Gọi hàm khi nhấn vào Tag
                                            className="cursor-pointer"
                                        >
                                            {status}
                                        </Tag>
                                    ),
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: (_, record) => (
                                        <Space size="middle">
                                            <Button
                                                className="text-white bg-indigo-400"
                                                onClick={() => handleDetailClick(record.idUser)} // Gọi hàm khi nhấn nút Detail
                                            >
                                                Detail
                                            </Button>
                                            <Button type="primary" danger>
                                                Delete
                                            </Button>
                                        </Space>
                                    ),
                                },
                            ]
                }
                dataSource={dataStudent} // Sử dụng hàm getDataSource để chọn dữ liệu phù hợp
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


            {/* Modal hiển thị thông tin chi tiết */}
            <Modal
                title="User Details"
                visible={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={null}
            >
                {selectedUser && (
                    <div>
                        <p><strong>ID:</strong> {selectedUser.idUser}</p>
                        <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Status:</strong> {selectedUser.status}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        {/* Thêm các trường thông tin khác nếu cần */}
                    </div>
                )}
            </Modal>


         
        </div>
    );
};

export default Student;