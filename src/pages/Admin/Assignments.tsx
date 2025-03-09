import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import {
    createNewAssignment,
    deleteAssignment,
    editAssignment,
    getAssignmentByCourseId,
} from "@/services/assignmentsService";
import { PaginationType } from "@/stores/types";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Space,
    Table,
    Tooltip,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Assignments = () => {
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [createModalVisible, setCreateModalVisible] =
        useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [deleteModalVisible, setDeleteModalVisible] =
        useState<boolean>(false);
    const [assignments, setAssignments] = useState<[]>([]);
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

    const { courseId } = useParams();

    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });

    const navigate = useNavigate();

    const [form] = useForm();

    const handleReload = () => {
        setReload(!reload);
    };

    // Hàm xử lý phân trang
    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    const fetchAssignmentsInACourse = async (courseId: number | string) => {
        try {
            setLoading(true);
            const response = await getAssignmentByCourseId(courseId);
            if (response.status === 200) {
                setAssignments(response.data.$values);
            }
        } catch (error: any) {
            console.log("error: ", error.status);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignmentsInACourse(courseId!);
    }, [reload]);

    const handleSubmitCreateForm = async (credentials: any) => {
        try {
            setModalLoading(true);
            const response = await createNewAssignment({
                courseId: courseId,
                title: credentials.title,
                description: credentials.description,
                dueDate: credentials.dueDate.format("YYYY-MM-DD"),
            });
            if (response.status === 201) {
                toast.success("Create successfully !");
                setCreateModalVisible(false);
                handleReload();
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setModalLoading(false);
        }
    };

    const handelSubmitEditForm = async (credentials: any) => {
        try {
            setModalLoading(true);
            const response = await editAssignment(
                selectedAssignment!.assignmentId,
                {
                    title: credentials.title,
                    description: credentials.description,
                    dueDate: credentials.dueDate.format("YYYY-MM-DD"),
                }
            );
            if (response.status === 200) {
                toast.success("Edit successfully !");
                handleReload();
                setEditModalVisible(false);
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setModalLoading(false);
        }
    };

    useEffect(() => {
        if (selectedAssignment) {
            form.setFieldsValue({
                title: selectedAssignment.title,
                description: selectedAssignment.description,
                dueDate: dayjs(selectedAssignment.dueDate),
            });
        } else {
            form.setFieldsValue({ title: "", description: "", dueDate: null });
        }
    }, [selectedAssignment]);

    const handleDeleteAssignment = async (assignmentId: number) => {
        try {
            const response = await deleteAssignment(assignmentId);
            if (response.status === 204) {
                toast.success("Delete sucessfully !");
                handleReload();
                setDeleteModalVisible(false);
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
            <div className="w-full">
                <div>
                    <CustomBreadCrumb />
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="">
                        <div className="py-8 text-3xl font-bold">
                            <h1>Assignments Management</h1>
                        </div>
                    </div>

                    <div className="">
                        <Tooltip title="Create new assignment" placement="left">
                            <Button
                                variant="solid"
                                type="primary"
                                onClick={() => setCreateModalVisible(true)}
                            >
                                <CiCirclePlus size={30} />
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                {/* Search Form */}
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
                <div className="w-full">
                    <Table
                        rowHoverable={false}
                        scroll={{
                            y: 380,
                        }}
                        columns={[
                            {
                                title: "ID",
                                dataIndex: "assignmentId",
                                key: "assignmentId",
                                width: "10%",
                            },
                            {
                                title: "Course ID",
                                dataIndex: "courseId",
                                key: "courseId",
                                width: "10%",
                            },
                            {
                                title: "Title",
                                dataIndex: "title",
                                key: "title",
                            },
                            {
                                title: "Description",
                                dataIndex: "description",
                                key: "description",
                            },
                            {
                                title: "Due Date",
                                dataIndex: "dueDate",
                                key: "dueDate",
                            },
                            {
                                title: "Action",
                                dataIndex: "action",
                                key: "action",
                                render: (_: any, record: any) => {
                                    return (
                                        <Space size="middle">
                                            {/* Detail button */}
                                            <Tooltip
                                                title="Detail"
                                                placement="top"
                                            >
                                                <Button
                                                    variant="solid"
                                                    color="purple"
                                                    className="text-white px-2"
                                                    onClick={() => {
                                                        console.log(
                                                            "record: ",
                                                            record
                                                        );
                                                        navigate(
                                                            `/dashboard/courses/${courseId}/assignments/${record.assignmentId}/submissions`
                                                        );
                                                    }}
                                                >
                                                    <BiDetail className="text-[1rem]" />
                                                </Button>
                                            </Tooltip>

                                            {/* Edit button */}
                                            <Tooltip
                                                title="Edit"
                                                placement="top"
                                            >
                                                <Button
                                                    color="yellow"
                                                    variant="solid"
                                                    className="text-white bg-yellow-400 px-2"
                                                    onClick={() => {
                                                        setEditModalVisible(
                                                            true
                                                        );
                                                        setSelectedAssignment(
                                                            record
                                                        );
                                                    }}
                                                >
                                                    <FiEdit3 className="text-[1rem]" />
                                                </Button>
                                            </Tooltip>

                                            {/* Delete button */}
                                            <Tooltip
                                                title="Delete"
                                                placement="top"
                                            >
                                                <Button
                                                    type="primary"
                                                    danger
                                                    className="px-2"
                                                    onClick={() => {
                                                        setSelectedAssignment(
                                                            record
                                                        );
                                                        setDeleteModalVisible(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <AiOutlineDelete className="text-[1rem]" />
                                                </Button>
                                            </Tooltip>

                                            {/* Assign button */}
                                            <Tooltip
                                                title="Assign"
                                                placement="top"
                                            >
                                                <Button
                                                    variant="solid"
                                                    color="green"
                                                    className="px-2"
                                                    // onClick={() => {
                                                    //     setAssignModalVisible(true);
                                                    //     setSelectedCourse(record);
                                                    //     fetchTeachersList();
                                                    // }}
                                                >
                                                    <MdOutlineAssignmentInd className="text-[1rem]" />
                                                </Button>
                                            </Tooltip>
                                        </Space>
                                    );
                                },
                            },
                        ]}
                        dataSource={assignments} // Sử dụng hàm getDataSource để chọn dữ liệu phù hợp
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

                {/* Modal create new assignment */}
                <Modal
                    title={<h1 className="text-2xl">Create new assignment</h1>}
                    open={createModalVisible}
                    onCancel={() => setCreateModalVisible(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmitCreateForm}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter title !",
                                },
                            ]}
                        >
                            <Input placeholder="Enter assignment title" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter description !",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={5}
                                placeholder="Enter assignment description"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Due Date"
                            name="dueDate"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter due date !",
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={modalLoading}
                                variant="solid"
                                type="primary"
                                htmlType="submit"
                            >
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Modal edit new assignment */}
                <Modal
                    title={<h1 className="text-2xl">Edit new assignment</h1>}
                    open={editModalVisible}
                    onCancel={() => {
                        setEditModalVisible(false);
                        setSelectedAssignment(null);
                    }}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handelSubmitEditForm}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter title !",
                                },
                            ]}
                        >
                            <Input placeholder="Enter assignment title" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter description !",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={5}
                                placeholder="Enter assignment description"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Due Date"
                            name="dueDate"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter due date !",
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={modalLoading}
                                variant="solid"
                                type="primary"
                                htmlType="submit"
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Modal confirm delete  */}
                <Modal
                    open={deleteModalVisible}
                    onCancel={() => setDeleteModalVisible(false)}
                    okText="Confirm"
                    onOk={() =>
                        handleDeleteAssignment(
                            selectedAssignment.assignmentId as number
                        )
                    }
                >
                    <p className="flex gap-2">
                        <ExclamationCircleIcon className="w-6 h-6 text-orange-400" />
                        Are you sure ?
                    </p>
                </Modal>
            </div>
        </>
    );
};

export default Assignments;
