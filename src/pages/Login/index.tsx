import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAuth } from "@/services/authService";
import { login } from "@/stores/authSlice";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
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
                toast.success("Login successfully!", {
                    position: "top-center",
                });
                navigate("/");
            }
        } catch (err) {
            toast.error("Your credentials is correct!", {
                position: "top-center",
            });
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-primary-purple to-transparent">
                <div className="min-w-[400px] flex flex-col justify-center p-8 bg-white rounded-lg shadow-lg">
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
                                        className="py-6 font-bold"
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
                                            className="font-bold hover:underline hover:text-purple-500 text-primary-purple"
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
                            And
                        </span>
                        <div className="border-t-[1px] border-[#ddd] border-solid w-full"></div>
                    </div>
                    <div className="text-center mt-[1.5rem]">
                        <span>Welcome to Course</span>
                    </div>
                </div>
            </div>
        </>
    );
}
