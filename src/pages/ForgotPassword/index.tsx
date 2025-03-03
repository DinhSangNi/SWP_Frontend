import { Form, Input } from "antd";
import {
    LockClosedIcon,
    LockOpenIcon,
    CheckCircleIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { forgotPassword, resetPassword } from "@/services/authService";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isSuccess, setIsSucccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const forgotPasswordForm = useAnimation();
    const resetPasswordForm = useAnimation();

    const navigate = useNavigate();

    // Check confirm password
    const checkConfirmNewPassword = ({ getFieldValue }: any) => ({
        validator(_: any, value: string) {
            if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error("Confirm Password not match!"));
        },
    });

    const handleForgotPassword = async (credentials: any) => {
        console.log(credentials);
        try {
            setLoading(true);
            const response = await forgotPassword(credentials.email);
            if (response) {
                setIsSucccess(true);
                toast.success(response.message);
            }
        } catch (error: any) {
            console.log("error: ", error);
            setIsSucccess(false);
            setMessage("Email Not Found!");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (credentials: any) => {
        try {
            const response = await resetPassword(
                credentials.email,
                credentials.verificationCode,
                credentials.newPassword
            );
            if (response) {
                toast.success("Reset password successfully!");
                navigate("/login");
            }
        } catch (error) {
            console.log("error: ", error);
            toast.error("Reset password failed!");
        }
    };

    useEffect(() => {
        forgotPasswordForm.start(
            {
                opacity: isSuccess ? 0 : 1,
                x: isSuccess ? 448 : 0,
            },
            {
                ease: "linear",
                duration: 0.5,
            }
        );

        resetPasswordForm.start(
            {
                opacity: isSuccess ? 1 : 0,
                x: isSuccess ? 0 : 448,
            },
            {
                ease: "linear",
                duration: 0.5,
            }
        );

        return () => {
            forgotPasswordForm.stop();
            resetPasswordForm.stop();
        };
    }, [isSuccess, forgotPasswordForm, resetPasswordForm]);

    console.log("message: ", message);
    console.log("success: ", isSuccess);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary-purple to-transparent relative">
                <motion.div
                    initial={{ opacity: 1, x: 0 }}
                    animate={forgotPasswordForm}
                    className="absolute z-10 bg-white p-5 rounded-lg shadow-xl w-full max-w-md"
                >
                    <div className="w-full flex justify-center items-center mb-5 ">
                        <div className="border-4 border-black rounded-full p-3">
                            <LockClosedIcon className="h-16 w-16" />
                        </div>
                    </div>
                    <div className="w-full text-center mb-5">
                        <h1 className="text-3xl font-bold">Forgot Password</h1>
                    </div>
                    <div className="w-full text-center text mb-5">
                        <p>
                            Please enter your email and we'll help you reset
                            your password.
                        </p>
                    </div>
                    {loading ? (
                        <iframe
                            className="w-full"
                            src="https://lottie.host/embed/775093df-19b8-4f32-a1e8-fe25802e5413/XAQdOLwnQI.lottie"
                        />
                    ) : (
                        !isSuccess && (
                            <Form
                                className="w-full"
                                onFinish={handleForgotPassword}
                            >
                                <div className="w-full text-center text-red-600 mb-2">
                                    <p>{message}</p>
                                </div>
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
                                    className="w-full text-center px-3"
                                >
                                    <Input
                                        className="w-full px-3 py-1"
                                        placeholder="Enter your email"
                                    />
                                </Form.Item>
                                <Form.Item className="w-full flex justify-center items-center">
                                    <button
                                        type="submit"
                                        className="px-3 py-1 text-[1rem] font-bold text-black border-2 border-black rounded-md transition-colors duration-300 hover:text-primary-purple hover:bg-purple-300 hover:border-primary-purple"
                                    >
                                        Continue
                                    </button>
                                </Form.Item>
                            </Form>
                        )
                    )}
                    <div className="w-full ">
                        <Link
                            to="/login"
                            className="flex justify-center items-center gap-2 hover:text-primary-purple"
                        >
                            <span>
                                <ArrowLeftIcon className="w-4 h-4" />
                            </span>{" "}
                            <p>Go back to login page</p>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 448 }}
                    animate={resetPasswordForm}
                    className="absolute bg-white p-5 rounded-lg shadow-xl w-full max-w-md"
                >
                    <div className="w-full flex justify-center items-center mb-5 ">
                        <div className="border-4 border-black rounded-full p-3">
                            <LockOpenIcon className="h-16 w-16" />
                        </div>
                    </div>
                    <div className="w-full text-center mb-5">
                        <h1 className="text-3xl font-bold">Reset Password</h1>
                    </div>
                    <Form
                        onFinish={handleResetPassword}
                        layout="vertical"
                        className="p-3"
                    >
                        <Form.Item
                            name="email"
                            label="Email"
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
                            <Input placeholder="Enter your email" />
                        </Form.Item>
                        <Form.Item
                            name="verificationCode"
                            label="Verification Code"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter your Verification Code!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter your verification code" />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            label="New Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password!",
                                },
                                {
                                    min: 8,
                                    message:
                                        "The password has at least 8 characters!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter your new password" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter your confirm password!",
                                },
                                checkConfirmNewPassword,
                            ]}
                        >
                            <Input placeholder="Enter your confirm password" />
                        </Form.Item>
                        <Form.Item className="w-full flex justify-center items-center">
                            <button
                                type="submit"
                                className="px-3 py-1 text-[1rem] font-bold text-black border-2 border-black rounded-md transition-colors duration-300 hover:text-primary-purple hover:bg-purple-300 hover:border-primary-purple"
                            >
                                Reset
                            </button>
                        </Form.Item>
                    </Form>
                </motion.div>
            </div>
        </>
    );
};

export default ForgotPassword;
