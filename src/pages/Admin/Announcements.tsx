import { Button, Space, Table, Modal, Form, Input } from "antd";
import { PaginationType } from "@/stores/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import announcementsApi from "@/services/announcements";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

type Props = {
    type: string;
};

const Announcements = ({ type }: Props) => {
    const [dataAnnouncements, setDataAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [deleteAnnouncementId, setDeleteAnnouncementId] = useState<string | null>(null);
    const [editAnnouncement, setEditAnnouncement] = useState<any>(null);
    const [reload, setReload] = useState(false);
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await announcementsApi.getAnnouncemmentsAll();
            console.log(response)
            setDataAnnouncements(response.data.$values);
            toast.success(`Fetched ${type} successfully!`);
        } catch (error) {
            console.error("Error fetching announcements:", error);
            toast.error(`Failed to fetch ${type}.`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reload]);


    const handleEdit = async (values: any) => {
        console.log(editAnnouncement)
        try {
            const updatedAnnouncement = {
                ...editAnnouncement,
                title: values.title,
                content: values.content,
            };
            await announcementsApi.editAnnouncemments(editAnnouncement.announcementID, updatedAnnouncement);
            toast.success("Updated announcement successfully!");
            setEditModalVisible(false);
            editForm.resetFields();
            fetchData();
        } catch (error) {
            console.error("Error updating announcement:", error);
            toast.error("Failed to update announcement.");
        }
    };

    const handleDelete = async (announcementId: string) => {
        try {
            await announcementsApi.deleteAnnouncemments(announcementId);
            toast.success("Deleted announcement successfully!");
            setDeleteModalVisible(false);
            setDeleteAnnouncementId(null);
            setReload(!reload); // Trigger a reload of the data
        } catch (error) {
            console.error("Error deleting announcement:", error);
            toast.error("Failed to delete announcement.");
        }
    };

    const openEditModal = (record: any) => {
        setEditAnnouncement(record);
        editForm.setFieldsValue({
            title: record.title,
            content: record.content,
        });
        setEditModalVisible(true);
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
                <div className="flex items-center justify-between py-10 text-3xl font-bold">
                    <h1>{type} Management</h1>
                </div>
            </div>

            <Table
                columns={[
                    { title: "ID", dataIndex: "$id", key: "$id" },
                    { title: "Title", dataIndex: "title", key: "title" },
                    { title: "Content", dataIndex: "content", key: "content" },
                    {
                        title: "Action",
                        key: "action",
                        render: (_, record: any) => (
                            <Space size="middle">
                                <Button
                                    type="primary"
                                    onClick={() => openEditModal(record)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => {
                                        setDeleteAnnouncementId(record.announcementId);
                                        setDeleteModalVisible(true);
                                    }}
                                >
                                    Delete
                                </Button>
                            </Space>
                        ),
                    },
                ]}
                dataSource={dataAnnouncements}
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
                title="Confirm Delete"
                open={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
                onOk={() => handleDelete(deleteAnnouncementId as any)}
            >
                <p className="flex gap-2">
                    <ExclamationCircleIcon className="w-6 h-6 text-orange-400" />
                    Are you sure you want to delete the announcement with ID:
                    <span>{deleteAnnouncementId && deleteAnnouncementId}</span>?
                </p>
            </Modal>


            <Modal
                title="Edit Announcement"
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    editForm.resetFields();
                }}
                onOk={() => editForm.submit()}
            >
                <Form form={editForm} onFinish={handleEdit} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: "Please input the title!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{ required: true, message: "Please input the content!" }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Announcements;