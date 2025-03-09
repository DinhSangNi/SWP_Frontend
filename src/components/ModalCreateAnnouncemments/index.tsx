import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import announcemmentsApi from "@/services/announcements"; // You'll need to create this service

const ModalCreateAnnouncement = ({ courseId, visible, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Make sure courseId is correctly formatted (might need to be a number instead of string)
            const payload = {
                courseId: Number(courseId) || courseId, // Convert to number if needed
                title: values.title,
                content: values.content
            };
            
            console.log("Sending announcement payload:", payload);
            await announcemmentsApi.createAnnouncemments(payload);
            toast.success("Announcement created successfully!");
            form.resetFields();
            onSuccess();
        } catch (error) {
            console.error("Error creating announcement:", error);
            toast.error(`Failed to create announcement: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Create Announcement"
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form 
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    courseId: courseId
                }}
            >
                <Form.Item
                    name="courseId"
                    label="Course ID"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: "Please enter announcement title",
                        },
                    ]}
                >
                    <Input placeholder="Enter announcement title" />
                </Form.Item>

                <Form.Item
                    name="content"
                    label="Content"
                    rules={[
                        {
                            required: true,
                            message: "Please enter announcement content",
                        },
                    ]}
                >
                    <Input.TextArea 
                        rows={4} 
                        placeholder="Enter announcement content" 
                    />
                </Form.Item>

                <div className="flex justify-end gap-2">
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="bg-blue-500"
                    >
                        Create
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalCreateAnnouncement;