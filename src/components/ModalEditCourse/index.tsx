import { Course } from "@/stores/types";
import { Modal, Form, Input, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

const { RangePicker } = DatePicker;

type Props = {
    open: boolean;
    onCancel: () => void;
    onSave: (value: any) => void;
    initialValues: Course;
};

const ModalEditCourse = ({ open, onCancel, onSave, initialValues }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                dates: [
                    dayjs(initialValues?.startDate),
                    dayjs(initialValues?.endDate),
                ],
            }); // Cập nhật giá trị form khi initialValues thay đổi
        }
    }, [initialValues, form]);

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                onSave({ ...initialValues, ...values }); // Truyền cả courseId và dữ liệu mới
                form.resetFields();
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Modal
            title="Edit Course"
            open={open} // Sử dụng `open` thay vì `visible`
            onCancel={onCancel}
            onOk={handleSave}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={initialValues}
            >
                <Form.Item
                    name="courseName"
                    label="Course Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the course name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: "Please input the description!",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Dates"
                    name="dates"
                    rules={[
                        {
                            required: true,
                            message: "Please select the start and end dates!",
                        },
                    ]}
                >
                    <RangePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditCourse;
