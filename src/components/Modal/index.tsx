import React, { useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import { CiCirclePlus } from "react-icons/ci";
import {
    Checkbox,
    Form,
    Input,
    Select,
} from 'antd';
import { toast } from 'react-toastify';
import { addUser } from '@/services/userService';

const ModalCustomer: React.FC = ({ type }) => {
    const [openResponsive, setOpenResponsive] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    // Hàm xử lý khi form được submit thành công
    const onFinish = async (values) => {
        console.log('Form values:', values);

        try {
            // Thêm role vào dữ liệu gửi lên server
            values.role = type === 'teacher' ? 'Teacher' : 'Student';

            const response = await addUser(values);
            if (response ) {
                console.log('Response from server:', response);
                toast.success(`User added successfully!`);
                setOpenResponsive(false); // Đóng modal sau khi submit
            } else {
                // Hiển thị thông báo lỗi từ server
                toast.error(response?.message || 'Failed to add user. Please try again.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('An error occurred while adding the user. Please try again.');
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
                <CiCirclePlus size={30} />
            </Button>
            <Modal
                title={`Add ${type}`}
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
                        label="FullName"
                        name="FullName"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phonenumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="Status"
                        rules={[{ required: true, message: 'Please select a status!' }]}
                    >
                        <Select>
                            <Select.Option value="Active">Active</Select.Option>
                            <Select.Option value="Inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        {type === 'teacher' ? (
                            <Select>
                                <Select.Option value="Teacher">Teacher</Select.Option>
                            </Select>
                        ) : (
                            <Select>
                                <Select.Option value="Student">Student</Select.Option>
                            </Select>
                        )}
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

export default ModalCustomer;