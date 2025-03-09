import { Button, Space, Table, Modal } from "antd";
import { PaginationType } from "@/stores/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    deleteCourse,
    editCourse,
    getAllCourses,
    getCourseById,
} from "@/services/courseService";
import ModalCreateCourse from "@/components/ModalCreateCourse";
import ModalEditCourse from "@/components/ModalEditCourse";
import ModalCreateAnnouncement from "@/components/ModalCreateAnnouncemments";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

type Props = {
    type: string;
};

const Courses = ({ type }: Props) => {
    const [dataCourse, setDataCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] =
        useState<boolean>(false);
    const [announcementModalVisible, setAnnouncementModalVisible] = 
        useState<boolean>(false);
    const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [reload, setReload] = useState(false);
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });

    const handleReload = () => {
        setReload(!reload);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAllCourses();
            console.log("Response from server:", response);
            setDataCourse(response.data.$values);
            toast.success(`Fetched ${type} successfully!`);
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error(`Failed to fetch ${type}.`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reload]);

    const handleDetailClick = async (courseId: string) => {
        try {
            const courseDetail = await getCourseById(courseId);
            setSelectedCourse(courseDetail.data);
            setDetailModalVisible(true);
        } catch (error) {
            console.error("Error fetching course details:", error);
            toast.error("Failed to fetch course details.");
        }
    };

    const handleEditClick = (courseId: string) => {
        const courseToEdit = dataCourse.find(
            (course: any) => course.courseId === courseId
        );
        setSelectedCourse(courseToEdit!);
        setEditModalVisible(true);
    };

    const handleCreateAnnouncementClick = (courseId: string) => {
        setSelectedCourseId(courseId);
        setAnnouncementModalVisible(true);
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

    return (
        <div className="w-full overflow-y-scroll">
            <div className="w-full">
                <div className="py-10 text-3xl font-bold">
                    <h1>{type} Management</h1>
                </div>
            </div>

            <div className="flex justify-end mb-5">
                <ModalCreateCourse reload={handleReload} type="create" />
            </div>

            <Table
                columns={[
                    {
                        title: "ID",
                        dataIndex: "courseId",
                        key: "id",
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
                    },
                    {
                        title: "Action",
                        key: "action",
                        render: (_, record: any) => (
                            <Space size="middle">
                                <Button
                                    className="text-white bg-indigo-400"
                                    onClick={() =>
                                        handleDetailClick(record.courseId)
                                    }
                                >
                                    Detail
                                </Button>
                                <Button
                                    className="text-white bg-yellow-400"
                                    onClick={() =>
                                        handleEditClick(record.courseId)
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => {
                                        setDeleteCourseId(record.courseId);
                                        setDeleteModalVisible(true);
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button
                                    className="text-white bg-green-500"
                                    onClick={() =>
                                        handleCreateAnnouncementClick(record.courseId)
                                    }
                                >
                                    Create Announcements
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

            <Modal
                title="Course Details"
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={null}
            >
                {selectedCourse && (
                    <div>
                        <p>
                            <strong>ID:</strong> {selectedCourse.courseId || 0}
                        </p>
                        <p>
                            <strong>Course Name:</strong>{" "}
                            {selectedCourse.courseName}
                        </p>
                        <p>
                            <strong>Description:</strong>{" "}
                            {selectedCourse.description}
                        </p>
                    </div>
                )}
            </Modal>

            <ModalEditCourse
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onSave={handleSaveEdit}
                initialValues={selectedCourse}
            />
            
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

            <ModalCreateAnnouncement 
                courseId={selectedCourseId}
                visible={announcementModalVisible}
                onCancel={() => setAnnouncementModalVisible(false)}
                onSuccess={() => {
                    setAnnouncementModalVisible(false);
                    handleReload();
                }}
            />
        </div>
    );
};

export default Courses;