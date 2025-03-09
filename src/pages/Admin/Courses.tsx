import {
    Button,
    Space,
    Table,
    Modal,
    Tooltip,
    Input,
    Radio,
    RadioChangeEvent,
} from "antd";
import { Course, PaginationType, TeacherType } from "@/stores/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    assignTeacherToCourse,
    deleteCourse,
    editCourse,
    getAllCourses,
    getCourseById,
    getCourseEnrollments,
    showStudentsListInACourse,
    unassignTeacherToCourse,
} from "@/services/courseService";
import ModalCreateCourse from "@/components/ModalCreateCourse";
import ModalEditCourse from "@/components/ModalEditCourse";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { BiDetail } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getAllUser } from "@/services/userService";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

type Props = {
    type: string;
};

const Courses = ({ type }: Props) => {
    // State
    const [dataCourse, setDataCourse] = useState<Partial<Course>[]>([]);
    const [loading, setLoading] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState<boolean>(false);
    const [studentsListLoading, setStudentsListLoading] =
        useState<boolean>(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] =
        useState<boolean>(false);
    const [assignModalVisible, setAssignModalVisible] =
        useState<boolean>(false);
    const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [teachers, setTeachers] = useState<[] | null>(null);
    const [students, setStudents] = useState<[] | null>(null);
    const [valueRadio, setValueRadio] = useState("details");
    const [reload, setReload] = useState(false);
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });

    const navigate = useNavigate();

    const [query, setQuery] = useState<string>("");
    const [searchedData, setSearchedData] = useState<Partial<Course>[]>([]);

    // Functions
    const handleReload = () => {
        setReload(!reload);
    };

    const hanldeAssignTeacherToCourse = useCallback(
        async (courseId: number, teacherId: number) => {
            try {
                const response = await assignTeacherToCourse(
                    courseId,
                    teacherId
                );
                if (response.status === 200) {
                    toast.success("Assign successfully!");
                }
            } catch (error: any) {
                console.log("error: ", error);
                toast.error("Assgin failed! This course already has a teacher");
                if (error.status === 401) {
                    toast.error("Your token expired! Please re-authenticate!");
                    navigate("/login");
                }
            }
        },
        []
    );

    const hanldeConfirmAssign = (
        teacherId: number,
        courseId: number,
        teacherName: string,
        courseName: string
    ) => {
        Modal.confirm({
            cancelText: "Cancel",
            content: (
                <p className="mb-5">
                    Do you want assign the teacher{" "}
                    <span className="font-bold">{teacherName}</span> to{" "}
                    <span className="font-bold">{courseName}</span> course ?
                </p>
            ),
            okText: "Confirm",
            zIndex: 3000,
            centered: true,
            onOk: async () => {
                await hanldeAssignTeacherToCourse(teacherId, courseId);
            },
        });
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllCourses();
            console.log("Response from server:", response);
            setDataCourse(response.data.$values);
            // toast.success(`Fetched ${type} successfully!`);
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error(`Failed to fetch ${type}.`);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTeachersList = useCallback(async () => {
        try {
            const response = await getAllUser();
            if (response.status === 200) {
                const teachersArray = response.data.$values.filter(
                    (item: TeacherType) => {
                        return item.role === "Teacher";
                    }
                );
                if (teachersArray) {
                    setTeachers(teachersArray);
                }
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                toast.error("Your token expired! Please re-authenticate!");
                navigate("/login");
            }
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [reload]);

    const handleDetailClick = async (courseId: string) => {
        try {
            setDetailsLoading(true);
            const courseDetail = await getCourseById(courseId);
            setSelectedCourse(courseDetail.data);
            setDetailModalVisible(true);
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleEditClick = (courseId: string) => {
        const courseToEdit = dataCourse?.find(
            (course: any) => course.courseId === courseId
        );
        setSelectedCourse(courseToEdit!);
        setEditModalVisible(true);
    };

    const handleDelete = async (courseId: string) => {
        try {
            await deleteCourse(courseId);
            toast.success("Deleted course successfully!");
            fetchData();
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete course.");
        }
    };

    const handleSaveEdit = async (updatedCourse: any) => {
        try {
            await editCourse(updatedCourse.courseId, updatedCourse);
            toast.success("Course updated successfully!");
            setEditModalVisible(false);
            fetchData();
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Failed to update course.");
        }
    };

    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    const handleConfirmUnassign = () => {
        Modal.confirm({
            cancelText: "Cancel",
            okText: "Confirm",
            content: (
                <p className="mb-5">Do you want unassign this teacher ?</p>
            ),
            className: "",
            onOk: () => {
                handleUnassignTeacherToCourse(selectedCourse.courseId);
            },
            maskClosable: true,
            centered: true,
        });
    };

    const handleUnassignTeacherToCourse = async (courseId: number) => {
        try {
            const response = await unassignTeacherToCourse(courseId);
            if (response.status === 200) {
                toast.success("Remove Successfully!");
                setDetailModalVisible(false);
            }
        } catch (error: any) {
            console.log("error: ", error);
            toast.error(`Unassign failed! ${error.response?.message}`);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    // Fetch list of students in a specific course funtion
    const fetchStudentsListInACourse = async (courseId: number) => {
        try {
            setStudentsListLoading(true);
            const response = await showStudentsListInACourse(courseId);
            if (response.status === 200) {
                setStudents(response.data.$values);
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
            setStudents([]);
        } finally {
            setStudentsListLoading(false);
        }
    };

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
            const searchedTeachersList = dataCourse?.filter((teacher: any) => {
                console.log(teacher.idUser?.toString().includes(query.trim()));
                return (
                    teacher.fullName?.includes(query.trim()) ||
                    teacher.idUser?.toString().includes(query.trim())
                );
            });

            setSearchedData(searchedTeachersList!);
        };
        const debounceLimit = setTimeout(handleShowSearchResults, 300);

        return () => clearTimeout(debounceLimit);
    }, [query]);

    useEffect(() => {
        if (selectedCourse && valueRadio === "ParticipatingStudents") {
            fetchStudentsListInACourse(selectedCourse.courseId);
        }
    }, [valueRadio]);

    const handleRadioChange = (e: RadioChangeEvent) => {
        setValueRadio(e.target.value);
    };

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center">
                <div className="">
                    <div className="py-8 text-3xl font-bold">
                        <h1>{type} Management</h1>
                    </div>
                </div>
                <div>
                    <ModalCreateCourse reload={handleReload} type="create" />
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
            <Table
                scroll={{
                    y: 380,
                }}
                columns={[
                    {
                        title: "ID",
                        dataIndex: "courseId",
                        key: "id",
                        width: "10%",
                    },
                    {
                        title: "Course Name",
                        dataIndex: "courseName",
                        key: "courseName",
                    },
                    {
                        title: "Description",
                        dataIndex: "description",
                        key: "description",
                        width: "50%",
                    },
                    {
                        title: "Action",
                        key: "action",
                        render: (_, record: any) => (
                            <Space size="middle">
                                {/* Detail button */}
                                <Tooltip title="Detail" placement="top">
                                    <Button
                                        variant="solid"
                                        color="purple"
                                        className="text-white px-2"
                                        onClick={() =>
                                            handleDetailClick(record.courseId)
                                        }
                                    >
                                        <BiDetail className="text-[1rem]" />
                                    </Button>
                                </Tooltip>

                                {/* Edit button */}
                                <Tooltip title="Edit" placement="top">
                                    <Button
                                        color="yellow"
                                        variant="solid"
                                        className="text-white bg-yellow-400 px-2"
                                        onClick={() =>
                                            handleEditClick(record.courseId)
                                        }
                                    >
                                        <FiEdit3 className="text-[1rem]" />
                                    </Button>
                                </Tooltip>

                                {/* Delete button */}
                                <Tooltip title="Delete" placement="top">
                                    <Button
                                        type="primary"
                                        danger
                                        className="px-2"
                                        onClick={() => {
                                            setDeleteCourseId(record.courseId);
                                            setDeleteModalVisible(true);
                                        }}
                                    >
                                        <AiOutlineDelete className="text-[1rem]" />
                                    </Button>
                                </Tooltip>

                                {/* Assign button */}
                                <Tooltip title="Assign" placement="top">
                                    <Button
                                        variant="solid"
                                        color="green"
                                        className="px-2"
                                        onClick={() => {
                                            setAssignModalVisible(true);
                                            setSelectedCourse(record);
                                            fetchTeachersList();
                                        }}
                                    >
                                        <MdOutlineAssignmentInd className="text-[1rem]" />
                                    </Button>
                                </Tooltip>
                            </Space>
                        ),
                    },
                ]}
                dataSource={searchedData.length > 0 ? searchedData : dataCourse}
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
            {/* Modal details */}
            <Modal
                width={"40%"}
                centered
                loading={detailsLoading}
                title={
                    <h1 className="text-2xl font-bold mb-5">Course Details</h1>
                }
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                afterClose={() => {
                    setValueRadio("details"), setStudents([]);
                }}
                footer={null}
            >
                <div className="flex justify-between">
                    <Radio.Group
                        className="mb-3"
                        value={valueRadio}
                        onChange={handleRadioChange}
                        options={[
                            { value: "details", label: "Details" },
                            {
                                value: "ParticipatingStudents",
                                label: <p>List of Students</p>,
                            },
                        ]}
                    />
                    <div>
                        <Link
                            to={`/dashboard/courses/${selectedCourse?.courseId}/assignments`}
                            className="transition-all duration-500 underline"
                        >
                            Show assignments
                        </Link>
                    </div>
                </div>

                {valueRadio === "details" ? (
                    selectedCourse && (
                        <div className="w-full border-collapse">
                            <div className="flex h-full py-3 justify-start border-b-[1px] border-gray-200">
                                <div className="w-1/4 h-full flex items-center justify-start pl-4 font-bold">
                                    <p>ID:</p>
                                </div>
                                <div className="w-3/4 pl-4 flex items-center h-full">
                                    <p>{selectedCourse.courseId}</p>
                                </div>
                            </div>
                            <div className="flex h-full py-3 justify-start items-start border-b-[1px] border-gray-200">
                                <div className="w-1/4 h-full flex items-center justify-start pl-4 font-bold">
                                    <p>Name:</p>
                                </div>
                                <div className="w-3/4 pl-4 flex items-center h-full">
                                    <p>{selectedCourse.courseName}</p>
                                </div>
                            </div>
                            <div className="flex h-full py-3 justify-start items-start border-b-[1px] border-gray-200">
                                <div className="w-1/4 h-full flex items-center justify-start pl-4 font-bold">
                                    <p className="">Descriptions:</p>
                                </div>
                                <div className="w-3/4 pl-4 flex items-center h-full">
                                    <p>{selectedCourse.description}</p>
                                </div>
                            </div>
                            <div className="flex h-full py-3 justify-start items-start border-b-[1px] border-gray-200">
                                <div className="w-1/4 h-full flex items-center justify-start pl-4 font-bold">
                                    <p>Teacher:</p>
                                </div>
                                <div className="w-3/4 pl-4 flex items-center h-full">
                                    <p className="flex gap-3 items-center">
                                        {selectedCourse.teacher?.fullName}{" "}
                                        {!(
                                            typeof selectedCourse.teacher ===
                                            "string"
                                        ) && (
                                            <Tooltip
                                                title="remove"
                                                placement="right"
                                            >
                                                <span
                                                    className="p-1 bg-red-500 hover:opacity-60 cursor-pointer"
                                                    onClick={
                                                        handleConfirmUnassign
                                                    }
                                                >
                                                    <IoPersonRemoveOutline className="text-[1rem] text-white " />
                                                </span>
                                            </Tooltip>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex h-full py-3 justify-start items-start border-b-[1px] border-gray-200">
                                <div className="w-1/4 h-full flex items-center justify-start pl-4 font-bold">
                                    <p className="">Start Date:</p>
                                </div>
                                <div className="w-3/4 pl-4 flex items-center h-full">
                                    <p>{selectedCourse.startDate}</p>
                                </div>
                            </div>
                            <div className="flex h-full py-3 justify-start items-start border-b-[1px] border-gray-200">
                                <div className="w-1/4 h-full flex items-center justify-start pl-4 font-bold">
                                    <p className="">End Date:</p>
                                </div>
                                <div className="w-3/4 pl-4 flex items-center h-full">
                                    <p>{selectedCourse.endDate}</p>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="w-full">
                        <Table
                            className="w-full"
                            columns={[
                                {
                                    title: "ID",
                                    dataIndex: "$id",
                                    key: "$id",
                                    width: "20%",
                                },
                                {
                                    title: "FullName",
                                    dataIndex: "studentName",
                                    key: "studentName",
                                },
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                    key: "email",
                                    width: "40%",
                                },
                            ]}
                            loading={studentsListLoading}
                            dataSource={students as []}
                            pagination={false}
                            rowClassName="cursor-pointer"
                            scroll={{ y: 350 }}
                        />
                    </div>
                )}
            </Modal>
            {/* Modal edit */}
            <ModalEditCourse
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onSave={handleSaveEdit}
                initialValues={selectedCourse}
            />
            {/* Modal confirm delete  */}
            <Modal
                title="Confirm"
                open={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
                onOk={() => handleDelete(deleteCourseId as string)}
            >
                <p className="flex gap-2">
                    <ExclamationCircleIcon className="w-6 h-6 text-orange-400" />
                    Are you sure you want to
                    <span className="px-0 mx-0 font-bold">Delete</span> Course
                    which has id:{" "}
                    <span>{deleteCourseId && deleteCourseId}</span>?
                </p>
            </Modal>
            {/* Modal assign a course to a teacher */}
            <Modal
                title="Select a Teacher"
                open={assignModalVisible}
                onCancel={() => setAssignModalVisible(false)}
                width={"800px"}
            >
                {/* <p className="w-full mb-5">Select a teacher</p> */}
                <div className="w-full">
                    <Table
                        className="w-full"
                        columns={[
                            {
                                title: "FullName",
                                dataIndex: "fullName",
                                key: "fullName",
                            },
                            {
                                title: "Email",
                                dataIndex: "email",
                                key: "email",
                                // width: "13rem",
                            },
                            {
                                title: "Status",
                                dataIndex: "status",
                                key: "status",
                            },
                        ]}
                        dataSource={teachers as []}
                        pagination={false}
                        rowClassName="cursor-pointer"
                        scroll={{ y: 350 }}
                        onRow={(record: any) => {
                            return {
                                onClick: () => {
                                    hanldeConfirmAssign(
                                        selectedCourse.courseId,
                                        record.idUser,
                                        record.fullName,
                                        selectedCourse.courseName
                                    );
                                },
                            };
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Courses;
