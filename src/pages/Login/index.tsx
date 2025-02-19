import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAuth } from "@/services/authService";
import { login } from "@/stores/authSlice";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // API calling function
    const handleLogin = async (credentials: any) => {
        try {
            setLoading(true);
            // Call API
            const response = await loginAuth(credentials);

            if (response) {
                // Debug log
                console.log("Login successful:", response);
                dispatch(login(response));
                localStorage.setItem("token", response.token);
                successMessage();
                navigate("/");
            }
        } catch (err) {
            errorMessage();
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    const successMessage = () => {
        messageApi.success("Login successfully!");
    };

    const errorMessage = () => {
        messageApi.error("Your credentials is correct!");
    };
    return (
        <>
            {contextHolder}
            <div className=" flex flex-col justify-center px-[35rem] py-[5rem]">
                <h1 className="text-[2rem] font-bold text-center mb-[3rem] text-[#6d28d2]">
                    Login
                </h1>
                <div className="mb-[2rem]">
                    <Form
                        name="login-form"
                        onFinish={handleLogin}
                        layout="vertical"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your username!",
                                },
                            ]}
                        >
                            <Input
                                className="py-3"
                                prefix={<UserOutlined />}
                                placeholder="Username"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password!",
                                },
                                {
                                    min: 5,
                                    message:
                                        "Password has at least 8 characters!",
                                },
                            ]}
                        >
                            <Input.Password
                                className="py-3"
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className="flex justify-between">
                                <div className="mb-5">
                                    <input type="checkbox" id="agree" />
                                    <label
                                        htmlFor="agree"
                                        className="text-gray-900 ml-2 text-sm"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <a
                                        href="/forgot-password"
                                        className="hover:underline text-black text-sm hover:text-primary-purple"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mb-1 w-full">
                                <Button
                                    className="py-6"
                                    color="purple"
                                    variant="solid"
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                >
                                    Login
                                </Button>
                            </div>
                            <div className="mb-7 w-full">
                                Don't have an account?{" "}
                                <span>
                                    <Link
                                        className="font-bold hover:underline hover:text-primary-purple"
                                        to="/signup"
                                    >
                                        Sign Up
                                    </Link>
                                </span>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <div className="border-t-[1px] border-[#ddd] border-solid w-full"></div>
                    <span className="whitespace-nowrap text-[0.8rem] px-2">
                        Or with
                    </span>
                    <div className="border-t-[1px] border-[#ddd] border-solid w-full"></div>
                </div>
                <div className="text-center mt-[1.5rem]">
                    <span>Welcome to Course</span>
                </div>
            </div>
        </>
    );
}
