import scheduleApi from "@/services/schedule";
import { PaginationType } from "@/stores/types";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    type: string;
};

interface ISchedule {
    courseID: number;
    teacherID: number;
    scheduleDate: string; // Fixed typo from "shceduleDate"
    startDate: string;
    endDate: string;
    room: string;
}

const Schedule = ({ type }: Props) => {
    const [courseActive, setCourseActive] = useState<ISchedule[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editSchedule, setEditSchedule] = useState<ISchedule | null>(null);
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });
    const [editForm] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await scheduleApi.getAllCourseActive();
            setCourseActive(response.data.$values);
            toast.success(`Fetched ${type} successfully!`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (record: ISchedule) => {
        console.log(record)
        setEditSchedule(record);
        editForm.setFieldsValue({
            scheduleDate: record.scheduleDate,
            startTime: record.startDate,
            endTime: record.endDate,
            room: record.room,
        });
        setEditModalVisible(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = async (values: any) => {
        if (!editSchedule) return; // Guard clause to ensure editSchedule exists
        try {
            await scheduleApi.updateSchedule(editSchedule.courseID, {
                ...values,
                courseID: editSchedule.courseID, // Ensure courseID is included
            });
            toast.success("Updated schedule successfully!");
            setEditModalVisible(false);
            editForm.resetFields();
            fetchData();
        } catch (error) {
            console.error("Error updating schedule:", error);
            toast.error("Failed to update schedule.");
        }
    };

    const dataType = [
        { title: "ID", dataIndex: "$id", key: "$id" },
        { title: "Name", dataIndex: "courseName", key: "courseName" },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text: string) => (
                <div className="w-[250px] text-balance" title={text}>
                    {text}
                </div>
            ),
        },
        { title: "Start date", dataIndex: "startDate", key: "startDate" },
        { title: "End date", dataIndex: "endDate", key: "endDate" },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: ISchedule) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => openEditModal(record)}>
                        Edit
                    </Button>
                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
        // Optionally fetch data again with pagination params if API supports it
        fetchData();
    };

    return (
        <div className="w-full overflow-y-scroll">
            <div className="w-full">
                <div className="flex items-center justify-between py-10 text-3xl font-bold">
                    <h1>{type} Management</h1>
                </div>
            </div>

            <Table
                columns={dataType}
                dataSource={courseActive}
                className="w-full"
                loading={loading}
                pagination={{
                    current: pagination.currentPage,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    onChange: handlePageChange,
                }}
            />

            <Modal
                title="Edit Schedule"
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    editForm.resetFields();
                }}
                onOk={() => editForm.submit()}
            >
                <Form form={editForm} onFinish={handleEdit} layout="vertical">
                    <Form.Item
                        name="scheduleDate"
                        label="Schedule Date"
                        rules={[{ required: true, message: "Please input the schedule date!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="startTime"
                        label="Start Time"
                        rules={[{ required: true, message: "Please input the start time!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="endTime"
                        label="End Time"
                        rules={[{ required: true, message: "Please input the end time!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="room"
                        label="Room"
                        rules={[{ required: true, message: "Please input the room!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Schedule;