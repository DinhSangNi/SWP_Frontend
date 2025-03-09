import {
    Button,
    Space,
    Table,
    Tag,
    Modal,
    Tooltip,
    Input,
    Radio,
    RadioChangeEvent,
} from "antd";
import { PaginationType } from "@/stores/types";
import { useEffect, useState } from "react";
import ModalCustomer from "@/components/Modal";
import { getAllUser, getUserById, updateUser } from "@/services/userService";
import { toast } from "react-toastify";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
    confirmCourseEnrollment,
    getCourseEnrollments,
} from "@/services/courseService";
import { handleWhenTokenExpire } from "@/utils/authUtils";

type Props = {
    type: string;
};

const Student = ({ type }: Props) => {
    const [dataStudent, setDataStudent] = useState([]); // State lưu danh sách học sinh
    const [loading, setLoading] = useState(false); // State loading
    const [reload, setReload] = useState(false); // State để reload dữ liệu

    const [detailModalVisible, setDetailModalVisible] = useState(false); // State để hiển thị modal chi tiết
    const [selectedUser, setSelectedUser] = useState<any>(null); // State lưu thông tin chi tiết của người dùng
    const [deleteModalVisible, setDeleteModalVisible] =
        useState<boolean>(false);
    const [deleteStudentId, setDeleteStudentId] = useState<any>(null);
    const [valueRadio, setValueRadio] = useState("all");
    const [pendingStudents, setPendingStudents] = useState<[]>([]);

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
            // console.log("Response from server:", response);

            const students = response.data.$values.filter(
                (user: any) => user.role === "Student"
            );
            setDataStudent(students);
        } catch (error: any) {
            console.log("error: ", error);
            toast.error("Your token is expired! Please re-authenticate!");
            navigate("/login");
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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    console.log("valueRadio", valueRadio);

    const handleShowSearchResults = () => {
        let searchedTeachersList = [];
        if (valueRadio === "all") {
            searchedTeachersList = dataStudent.filter((student: any) => {
                return (
                    student.fullName?.includes(query.trim()) ||
                    student.idUser?.toString().includes(query.trim())
                );
            });
        } else {
            searchedTeachersList = pendingStudents.filter((student: any) => {
                return (
                    student.studentName?.includes(query.trim()) ||
                    student.courseName?.includes(query.trim()) ||
                    student.studentId?.toString().includes(query.trim()) ||
                    student.courseId?.toString().includes(query.trim())
                );
            });
        }

        console.log("searchedTeachersList", searchedTeachersList);

        setSearchedData(searchedTeachersList);
    };

    useEffect(() => {
        if (query.length === 0) {
            console.log("reload");
            setSearchedData([]);
            return;
        }

        console.log("query: ", query);

        const debounceLimit = setTimeout(handleShowSearchResults, 300);

        return () => clearTimeout(debounceLimit);
    }, [query]);

    const handleRadioChange = (e: RadioChangeEvent) => {
        setValueRadio(e.target.value);
    };

    const fetchPendingStudents = async () => {
        try {
            setLoading(true);
            const response = await getCourseEnrollments("Pending");
            if (response.status === 200) {
                setPendingStudents(response.data.$values);
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (valueRadio === "pending") {
            fetchPendingStudents();
        }
    }, [valueRadio]);

    const handleConfirmPendingStudent = (
        courseId: number,
        studentId: number
    ) => {
        Modal.confirm({
            content: <p>Are you sure ?</p>,
            okText: "Confirm",
            cancelText: "Cancel",
            maskClosable: true,
            onOk: async () => {
                try {
                    const response = await confirmCourseEnrollment(
                        courseId,
                        studentId
                    );
                    if (response.status === 200) {
                        toast.success("Confirm Successfullly!");
                        fetchPendingStudents();
                    }
                } catch (error: any) {
                    console.log("error: ", error);
                    if (error.status === 401) {
                        handleWhenTokenExpire();
                        navigate("/login");
                    }
                }
            },
        });
    };

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
                    <ModalCustomer type={"student"} reload={handleReload} />
                </div>
            </div>

            {/* Search Form */}
            <div className="mb-10 w-full flex items-center justify-start gap-4">
                <Input
                    allowClear
                    className="w-[25%] rounded-3xl hover:border-[#6d28d2] focus-within:border-[#6d28d2]"
                    prefix={<IoMdSearch className="text-[1.5rem]" />}
                    onChange={handleSearch}
                    value={query}
                    placeholder={
                        valueRadio === "all"
                            ? "Search student"
                            : "Search pending student"
                    }
                    size="large"
                />
                <div>
                    <Radio.Group
                        className="flex"
                        options={[
                            {
                                value: "all",
                                label: "All",
                            },
                            {
                                value: "pending",
                                label: "Pending",
                            },
                        ]}
                        value={valueRadio}
                        onChange={handleRadioChange}
                    />
                </div>
            </div>

            <div className="w-full">
                <Table
                    rowHoverable={false}
                    scroll={{
                        y: 380,
                    }}
                    columns={
                        type === "CoursesEnrollments"
                            ? [
                                  // Các cột cho CoursesEnrollments
                              ]
                            : valueRadio === "pending"
                              ? [
                                    {
                                        title: "ID",
                                        dataIndex: "$id",
                                        key: "$id",
                                        width: "10%",
                                    },
                                    {
                                        title: "Student ID",
                                        dataIndex: "studentId",
                                        key: "studentId",
                                        width: "10%",
                                    },
                                    {
                                        title: "Student Name",
                                        dataIndex: "studentName",
                                        key: "studentName",
                                    },
                                    {
                                        title: "Course ID",
                                        dataIndex: "courseId",
                                        key: "courseId",
                                        width: "10%",
                                    },
                                    {
                                        title: "Course Name",
                                        dataIndex: "courseName",
                                        key: "courseName",
                                    },
                                    {
                                        title: "Action",
                                        dataIndex: "action",
                                        key: "action",
                                        render: (_: any, record: any) => {
                                            return (
                                                <Button
                                                    variant="solid"
                                                    color="green"
                                                    onClick={() =>
                                                        handleConfirmPendingStudent(
                                                            record.courseId,
                                                            record.studentId
                                                        )
                                                    }
                                                >
                                                    Confirm
                                                </Button>
                                            );
                                        },
                                    },
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
                                        render: (status, record: any) => (
                                            <Tooltip
                                                color={
                                                    status === "Active"
                                                        ? "red"
                                                        : "green"
                                                }
                                                placement="rightTop"
                                                title={
                                                    status === "Active"
                                                        ? "Lock"
                                                        : "Unlock"
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
                                        render: (_, record: any) => (
                                            <Space size="middle">
                                                <Button
                                                    className="text-white bg-indigo-400"
                                                    onClick={() =>
                                                        handleDetailClick(
                                                            record.idUser
                                                        )
                                                    } // Gọi hàm khi nhấn nút Detail
                                                >
                                                    Detail
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    danger
                                                    onClick={() => {
                                                        setDeleteStudentId(
                                                            record.idUser
                                                        );
                                                        setDeleteModalVisible(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </Space>
                                        ),
                                    },
                                ]
                    }
                    dataSource={
                        searchedData.length > 0 || query.length > 0
                            ? searchedData
                            : valueRadio === "pending"
                              ? pendingStudents
                              : dataStudent
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
                open={detailModalVisible}
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

            {/* Modal show when click delete button */}
            <Modal
                title="Confirm"
                open={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
            >
                <p className="flex gap-2">
                    <ExclamationCircleIcon className="w-6 h-6 text-orange-400" />
                    Are you sure you want to
                    <span className="px-0 mx-0 font-bold">Delete</span> student
                    who has id:{" "}
                    <span>{deleteStudentId && deleteStudentId}</span>?
                </p>
            </Modal>
        </div>
    );
};

export default Student;
