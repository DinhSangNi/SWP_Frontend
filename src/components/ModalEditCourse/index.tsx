import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";

const ModalEditCourse = ({ open, onCancel, onSave, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues); // Cập nhật giá trị form khi initialValues thay đổi
        }
    }, [initialValues, form]);

    const handleSave = () => {
        form.validateFields()
            .then(values => {
                onSave({ ...initialValues, ...values }); // Truyền cả courseId và dữ liệu mới
                form.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
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
                    rules={[{ required: true, message: 'Please input the course name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditCourse;