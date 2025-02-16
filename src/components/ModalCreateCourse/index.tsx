import React, { useState } from 'react';
import { Button, Flex, Modal, Form, Input, DatePicker, Checkbox } from 'antd';
import { CiCirclePlus } from "react-icons/ci";
import { toast } from 'react-toastify';
import { createCourse } from '@/services/courseService';

const { RangePicker } = DatePicker;

const ModalCreateCourse: React.FC = ({reload}) => {
    const [openResponsive, setOpenResponsive] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    // Hàm xử lý khi form được submit thành công
    const onFinish = async (values) => {
        console.log('Form values:', values);

        try {
            // Xử lý dữ liệu trước khi gửi lên server
            const courseData = {
                courseName: values.courseName,
                description: values.description,
                startDate: values.dates[0].format('YYYY-MM-DD'), // Chuyển đổi ngày thành chuỗi
                endDate: values.dates[1].format('YYYY-MM-DD'), // Chuyển đổi ngày thành chuỗi
            };

            console.log('Course data to be sent:', courseData);

            const response = await createCourse(courseData);
            if (response) {
                toast.success('Course created successfully!');
                setOpenResponsive(false); // Đóng modal sau khi submit
            } else {
                toast.error('Failed to create course. Please try again.');
            }

            // Giả lập thành công
            toast.success('Course created successfully!');
            setOpenResponsive(false); // Đóng modal sau khi submit
            reload();
        } catch (error) {
            console.error('Error creating course:', error);
            toast.error('An error occurred while creating the course. Please try again.');
        }
    };

    // Hàm xử lý khi form submit thất bại
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        toast.error('Form submission failed. Please check your inputs.');
    };

    return (
        <Flex vertical gap="middle" align="flex-start">
            <Button type="primary" onClick={() => setOpenResponsive(true)}>
                <CiCirclePlus size={30} /> Create Course
            </Button>
            <Modal
                title="Create Course"
                centered
                open={openResponsive}
                onCancel={() => setOpenResponsive(false)}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
                footer={null} // Ẩn footer mặc định của Modal
            >
                <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                >
                    Form disabled
                </Checkbox>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} // Liên kết hàm onFinish
                    onFinishFailed={onFinishFailed} // Liên kết hàm onFinishFailed
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        label="Course"
                        name="courseName"
                        rules={[{ required: true, message: 'Please input the course name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the course name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Dates"
                        name="dates"
                        rules={[{ required: true, message: 'Please select the start and end dates!' }]}
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Flex>
    );
};

export default ModalCreateCourse;