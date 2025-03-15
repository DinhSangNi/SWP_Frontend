import { Button, Space, Table, Tag, Modal, Tooltip, Input, Form } from "antd";
import { PaginationType } from "@/stores/types";
import { useEffect, useState } from "react";
import ModalCustomer from "@/components/Modal";
import {
    getAllUser,
    getUserById,
    updateUser,
    updateUserById,
} from "@/services/userService";
import { toast } from "react-toastify";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { getAllCoursesOfATeacher } from "@/services/courseService";
import { useForm } from "antd/es/form/Form";
import { FiEdit3 } from "react-icons/fi";
import { BiDetail } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
    type: string;
};

const Teacher = ({ type }: Props) => {
    const [dataTeacher, setDataTeacher] = useState([]); // State lưu danh sách giáo viên
    const [assignedCoursesOfATeacher, setAssignedCoursesOfATeacher] = useState<
        any[]
    >([]);
    const [loading, setLoading] = useState(false); // State loading
    const [editLoading, setEditLoading] = useState<boolean>(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false); // State để hiển thị modal chi tiết
    const [
        assignedCoursesListModalVisible,
        setAssignedCoursesListModalVisible,
    ] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>(null); // State lưu thông tin chi tiết của người dùng
    const [reload, setReload] = useState(false); // State để reload dữ liệu
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });
    const [query, setQuery] = useState<string>("");
    const [searchedData, setSearchedData] = useState([]);

    const [form] = useForm();

    const navigate = useNavigate();

    // Hàm fetch dữ liệu người dùng
    const fetchData = async () => {
        console.log("here");
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
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    const fetchAssignedCoursesOfATeacher = async () => {
        try {
            const res = await getAllCoursesOfATeacher(selectedUser.idUser);
            if (res.status === 200 || res.status === 201) {
                setAssignedCoursesOfATeacher(res.data.$values);
            }
        } catch (error: any) {
            console.error("Error fetching users:", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    const handleLoadTeacherInform = async (userId: string) => {
        try {
            const userDetail = await getUserById(userId);
            form.setFieldsValue({
                fullName: userDetail.fullName,
                email: userDetail.email,
                phoneNumber: userDetail.phoneNumber,
            });
        } catch (error: any) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSave = async (credentials: any) => {
        try {
            setEditLoading(true);
            const res = await updateUserById(selectedUser.idUser, {
                fullName: credentials.fullName,
                email: credentials.email,
                phoneNumber: credentials.phoneNumber,
            });
            if (res) {
                toast.success("Save successfully !");
                setEditModalVisible(false);
                fetchData();
            }
        } catch (error: any) {
            console.error("Error fetching users:", error);
            toast.error("Save failed !");
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setEditLoading(false);
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

            setSearchedData(searchedTeachersList);
        };
        const debounceLimit = setTimeout(handleShowSearchResults, 300);

        return () => clearTimeout(debounceLimit);
    }, [query]);

    useEffect(() => {
        if (assignedCoursesListModalVisible) {
            fetchAssignedCoursesOfATeacher();
        }
    }, [assignedCoursesListModalVisible]);

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
                                    <Tooltip title="Detail" placement="top">
                                        <Button
                                            className="text-white bg-indigo-400"
                                            onClick={() =>
                                                handleDetailClick(record.idUser)
                                            } // Gọi hàm khi nhấn nút Detail
                                        >
                                            <BiDetail className="text-[1rem]" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Edit" placement="top">
                                        <Button
                                            color="yellow"
                                            variant="solid"
                                            onClick={() => {
                                                setEditModalVisible(true);
                                                setSelectedUser(record);
                                                handleLoadTeacherInform(
                                                    record.idUser
                                                );
                                            }}
                                        >
                                            <FiEdit3 className="text-[1rem]" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Delete" placement="top">
                                        <Button type="primary" danger>
                                            <AiOutlineDelete className="text-[1rem]" />
                                        </Button>
                                    </Tooltip>
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
                title={<div className="text-2xl font-bold">User Details</div>}
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={null}
            >
                {selectedUser && (
                    <div>
                        <div
                            className="mb-5 underline transition-opacity duration-200 hover:opacity-50 cursor-pointer"
                            onClick={() =>
                                setAssignedCoursesListModalVisible(true)
                            }
                        >
                            Show List of courses assigned
                        </div>
                        <div>
                            <p>
                                <strong>ID:</strong> {selectedUser.idUser}
                            </p>
                            <p>
                                <strong>Full Name:</strong>{" "}
                                {selectedUser.fullName}
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
                    </div>
                )}
            </Modal>
            <Modal
                title={
                    <div className="text-2xl font-bold">
                        List of courses assigned
                    </div>
                }
                open={assignedCoursesListModalVisible}
                onCancel={() => setAssignedCoursesListModalVisible(false)}
                width={"800px"}
                footer={null}
            >
                {/* <p className="w-full mb-5">Select a teacher</p> */}
                <div className="w-full my-5">
                    <Table
                        className="w-full z-[3000]"
                        columns={[
                            {
                                title: "Course ID",
                                dataIndex: "courseId",
                                key: "courseId",
                                width: "15%",
                            },
                            {
                                title: "Course Name",
                                dataIndex: "courseName",
                                key: "courseName",
                                width: "30%",
                            },
                            {
                                title: "Description",
                                dataIndex: "description",
                                key: "description",
                                // width: "13rem",
                            },
                        ]}
                        dataSource={assignedCoursesOfATeacher as []}
                        pagination={false}
                        rowClassName="cursor-pointer"
                        scroll={{ y: 350 }}
                        // onRow={(record: any) => {
                        //     return {
                        //         onClick: () => {
                        //             hanldeConfirmAssign(
                        //                 selectedCourse.courseId,
                        //                 record.idUser,
                        //                 record.fullName,
                        //                 selectedCourse.courseName
                        //             );
                        //         },
                        //     };
                        // }}
                    />
                </div>
            </Modal>

            {/* Edit modal */}
            <Modal
                title={
                    <div className="text-2xl font-bold">
                        List of courses assigned
                    </div>
                }
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                width={"500px"}
                footer={null}
            >
                {/* <p className="w-full mb-5">Select a teacher</p> */}
                <div className="w-full my-5">
                    <Form form={form} onFinish={handleSave} layout="vertical">
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your full name !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your phone number !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item className="w-full flex justify-end">
                            <Button
                                loading={editLoading}
                                htmlType="submit"
                                variant="solid"
                                color="primary"
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default Teacher;
