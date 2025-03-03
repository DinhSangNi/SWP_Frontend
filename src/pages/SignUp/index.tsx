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
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-primary-purple to-transparent">
                <div className=" flex flex-col justify-center items-start text-[#6d28d2] bg-white p-8 shadow-lg rounded-lg">
                    <h1 className="text-[2rem] font-bold text-center w-full mb-3">
                        Sign Up
                    </h1>
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
                                <Input
                                    className="py-2"
                                    placeholder="Fullname"
                                />
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
                                <Input
                                    className="py-2"
                                    placeholder="Username"
                                />
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
                                <Input className="py-2" placeholder="Email" />
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
                                    className="py-2"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="phonenumber"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter your phone number!",
                                    },
                                    {
                                        len: 10,
                                        message:
                                            "Please enter correct phone number format!",
                                    },
                                ]}
                            >
                                <Input
                                    className="py-2"
                                    placeholder="Phone Number"
                                />
                            </Form.Item>
                            <Form.Item>
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
                                        Sign Up
                                    </Button>
                                </div>
                                <div>
                                    <p className="text-[0.8rem] mb-2">
                                        By signing up, you agree to our{" "}
                                        <span>
                                            <Link
                                                to=""
                                                className="text-[#6d28d2] text-[0.8rem] underline hover:text-purple-900 "
                                            >
                                                Terms of Use
                                            </Link>
                                        </span>{" "}
                                        and{" "}
                                        <span>
                                            <Link
                                                to=""
                                                className="text-[#6d28d2] text-[0.8rem] underline hover:text-purple-900 "
                                            >
                                                Privacy Policy
                                            </Link>
                                        </span>
                                        .
                                    </p>
                                </div>
                                <div className="w-full text-[1rem] text-center">
                                    Already have an account?{" "}
                                    <span>
                                        <Link
                                            className="font-bold hover:underline text-[#6d28d2] hover:text-purple-500"
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
