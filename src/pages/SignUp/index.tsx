import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signup } from "@/services/authService";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleRegister = async (credentials: any) => {
        const userData = {
            FullName: credentials.fullname,
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
            phonenumber: credentials.phonenumber,
        };
        try {
            setLoading(true);

            const response = await signup(userData);

            if (response) {
                successMessage();
                navigate("/login");
            }
        } catch (err) {
            errorMessage();
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    const successMessage = () => {
        messageApi.success("Register successfully!");
    };

    const errorMessage = () => {
        messageApi.error("Register failed!");
    };

    return (
        <>
            {contextHolder}
            <div className="flex flex-col justify-center items-start px-[35rem] gap-y-[2rem] py-[1.4rem] text-[#6d28d2]">
                <h1 className="text-[2rem] font-bold text-center">Sign Up</h1>
                <div className="w-full">
                    <Form
                        name="register-form"
                        onFinish={handleRegister}
                        layout="vertical"
                    >
                        <Form.Item
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

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your email!",
                                },
                                {
                                    type: "email",
                                    message:
                                        "Please type correct email format!",
                                },
                            ]}
                        >
                            <Input className="py-3" placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your username!",
                                },
                                {
                                    min: 8,
                                    message:
                                        "Password has at least 8 characters!",
                                },
                            ]}
                        >
                            <Input.Password
                                className="py-3"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item
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
                            <Input
                                className="py-3"
                                placeholder="Phone Number"
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className="mb-3 w-full">
                                <Button
                                    className="py-6"
                                    color="purple"
                                    variant="solid"
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div className="mb-7 w-full">
                                Already have an account?{" "}
                                <span>
                                    <Link
                                        className="font-bold hover:underline hover:text-[#6d28d2]"
                                        to="/login"
                                    >
                                        Login here.
                                    </Link>
                                </span>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            {/* //     <Button
        //     fullWidth
        //     variant="outlined"
        //     startIcon={<GoogleIcon />}
        //     onClick={() => alert("Sign up with Google")}
        // >
        //     Sign up with Google
        // </Button> */}
        </>
    );
}
