import { Button, Form, Input, Menu, message } from "antd";
import { useState } from "react";

type Props = {};

const ProfileForm = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleSave = async (credentials: any) => {
        try {
            setLoading(true);
            messageApi.success("Updated Successfully!");
        } catch (error: any) {
            console.log("error ", error);
            messageApi.error("Updated Failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Form
                className="p-4 flex flex-col gap-5"
                name="register-form"
                onFinish={handleSave}
                layout="vertical"
            >
                <div className="flex justify-center gap-5">
                    <Form.Item
                        className="basis-1/2"
                        label="Full Name"
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your fullname!",
                            },
                        ]}
                    >
                        <Input className="py-3" placeholder="Fullname" />
                    </Form.Item>
                    <Form.Item
                        className="basis-1/2"
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your username!",
                            },
                        ]}
                    >
                        <Input className="py-3" placeholder="Username" />
                    </Form.Item>
                </div>

                <div className="flex justify-center gap-5">
                    <Form.Item
                        className="basis-1/2"
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!",
                            },
                            {
                                type: "email",
                                message: "Please type correct email format!",
                            },
                        ]}
                    >
                        <Input className="py-3" placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        className="basis-1/2"
                        label="Phone Number"
                        name="phonenumber"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your phone number!",
                            },
                            {
                                len: 10,
                                message:
                                    "Please enter correct phone number format!",
                            },
                        ]}
                    >
                        <Input className="py-3" placeholder="Phone Number" />
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button
                        className="font-bold"
                        color="purple"
                        variant="solid"
                        htmlType="submit"
                        loading={loading}
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default ProfileForm;
