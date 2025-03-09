import { Button, Space, Table, Tag, Modal, Tooltip, Input } from "antd";
import { PaginationType } from "@/stores/types";
import { useEffect, useState } from "react";
import ModalCustomer from "@/components/Modal";
import { getAllUser, getUserById, updateUser } from "@/services/userService";
import { toast } from "react-toastify";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

type Props = {
    type: string;
};

const Teacher = ({ type }: Props) => {
    const [dataTeacher, setDataTeacher] = useState([]); // State lưu danh sách giáo viên
    const [loading, setLoading] = useState(false); // State loading
    const [detailModalVisible, setDetailModalVisible] = useState(false); // State để hiển thị modal chi tiết
    const [selectedUser, setSelectedUser] = useState<any>(null); // State lưu thông tin chi tiết của người dùng
    const [reload, setReload] = useState(false); // State để reload dữ liệu
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });
    const [query, setQuery] = useState<string>("");
    const [searchedData, setSearchedData] = useState([]);

    const navigate = useNavigate();

    // Hàm fetch dữ liệu người dùng
    const fetchData = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await getAllUser(); // Gọi API lấy danh sách người dùng
            const teachers = response.data.$values.filter(
                (user: any) => user.role === "Teacher"
            );
            setDataTeacher(teachers);
        } catch (error: any) {
            console.error("Error fetching users:", error);
            if (error.status === 401) {
                console.log("here");
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    // Hàm xử lý khi nhấn nút "Detail"
    const handleDetailClick = async (userId: string) => {
        try {
            const userDetail = await getUserById(userId); // Gọi API lấy thông tin chi tiết
            setSelectedUser(userDetail); // Lưu thông tin chi tiết vào state
            setDetailModalVisible(true); // Hiển thị modal
        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Failed to fetch user details.");
        }
    };

    // Hàm xử lý khi nhấn vào Tag "Status"
    const handleStatusClick = async (userId: string, currentStatus: string) => {
        try {
            const newStatus =
                currentStatus === "Active" ? "Inactive" : "Active"; // Đảo ngược trạng thái
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
    };

    // Gọi API khi component được mount
    useEffect(() => {
        fetchData();
    }, [reload]);

    // Search function
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        if (query.length === 0) {
            console.log("reload");
            setSearchedData([]);
            return;
        }

        const handleShowSearchResults = () => {
            const searchedTeachersList = dataTeacher.filter((teacher: any) => {
                console.log(teacher.idUser?.toString().includes(query.trim()));
                return (
                    teacher.fullName?.includes(query.trim()) ||
                    teacher.idUser?.toString().includes(query.trim())
                );
            });

            console.log("searchedTeachersList", searchedTeachersList);

            setSearchedData(searchedTeachersList);
        };
        const debounceLimit = setTimeout(handleShowSearchResults, 300);

        return () => clearTimeout(debounceLimit);
    }, [query]);

    return (
        <div className="w-full">
            <div className="w-full flex items-center justify-between">
                <div className="">
                    <div className="py-8 text-3xl font-bold">
                        <h1>
                            {`${type[0].toUpperCase()}${type.slice(1)}`}{" "}
                            Management
                        </h1>
                    </div>
                </div>

                <div className="">
                    <ModalCustomer type={"teacher"} reload={handleReload} />
                </div>
            </div>

            {/* Search Form */}
            <div className="mb-10 w-1/4">
                <Input
                    allowClear
                    className="w-full rounded-3xl hover:border-[#6d28d2] focus-within:border-[#6d28d2]"
                    prefix={<IoMdSearch className="text-[1.5rem]" />}
                    onChange={handleSearch}
                    value={query}
                    // onPressEnter={handleEnter}
                    placeholder="Search teacher"
                    size="large"
                />
            </div>

            <div className="">
                <Table
                    scroll={{ y: 380 }}
                    columns={[
                        {
                            title: "ID",
                            dataIndex: "idUser",
                            key: "id",
                        },
                        {
                            title: "FullName",
                            dataIndex: "fullName",
                            key: "FullName",
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
                            render: (status: any, record: any) => (
                                <Tooltip
                                    color={
                                        status === "Active" ? "red" : "green"
                                    }
                                    placement="rightTop"
                                    title={
                                        status === "Active" ? "Lock" : "Unlock"
                                    }
                                >
                                    <Tag
                                        color={
                                            status === "Active"
                                                ? "green"
                                                : "red"
                                        }
                                        onClick={() =>
                                            handleStatusClick(
                                                record.idUser,
                                                status
                                            )
                                        } // Gọi hàm khi nhấn vào Tag
                                        className="cursor-pointer"
                                    >
                                        {status}
                                    </Tag>
                                </Tooltip>
                            ),
                        },
                        {
                            title: "Action",
                            key: "action",
                            render: (_, record) => (
                                <Space size="middle">
                                    <Button
                                        className="text-white bg-indigo-400"
                                        onClick={() =>
                                            handleDetailClick(record.idUser)
                                        } // Gọi hàm khi nhấn nút Detail
                                    >
                                        Detail
                                    </Button>
                                    <Button type="primary" danger>
                                        Delete
                                    </Button>
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={
                        searchedData.length > 0 || query.length > 0
                            ? searchedData
                            : dataTeacher
                    }
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
            </div>

            {/* Modal hiển thị thông tin chi tiết */}
            <Modal
                title="User Details"
                visible={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={null}
            >
                {selectedUser && (
                    <div>
                        <p>
                            <strong>ID:</strong> {selectedUser.idUser}
                        </p>
                        <p>
                            <strong>Full Name:</strong> {selectedUser.fullName}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedUser.email}
                        </p>
                        <p>
                            <strong>Status:</strong> {selectedUser.status}
                        </p>
                        <p>
                            <strong>Role:</strong> {selectedUser.role}
                        </p>
                        {/* Thêm các trường thông tin khác nếu cần */}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Teacher;
