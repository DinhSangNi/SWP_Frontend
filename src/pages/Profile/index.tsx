import {
    changePassword,
    getUserProfile,
    updateUserProfile,
} from "@/services/profileService";
import { getUserById } from "@/services/userService";
import { RootState } from "@/stores/store";
import {
    Button,
    ConfigProvider,
    Divider,
    Form,
    Input,
    Menu,
    MenuProps,
    message,
    Switch,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type UserDetail = {
    fullName?: string;
    userName?: string;
    role?: string;
    status?: string;
    email?: string;
    phoneNumber?: string;
};

const Profile = () => {
    const [userDetail, setUserDetail] = useState<Partial<UserDetail>>({
        fullName: "",
        userName: "",
        role: "",
        status: "",
        email: "",
        phoneNumber: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = useForm();

    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    // Call API to update user detail information
    const handleSave = async (credentials: any) => {
        try {
            setLoading(true);
            const response = await updateUserProfile(user!.idUser, credentials);
            if (response) {
                messageApi.success("Updated User Information Successfully!");
            }
        } catch (error: any) {
            console.log("error ", error);
            messageApi.error("Updated User Information Failed!");
            fetchUserDetailData();
        } finally {
            setLoading(false);
            setIsEdit(false);
        }
    };

    const handleIsEditChange = () => {
        setIsEdit(true);
    };

    // Check confirm password
    const checkConfirmNewPassword = ({ getFieldValue }: any) => ({
        validator(_: any, value: string) {
            if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error("Confirm Password not match!"));
        },
    });

    const handleSwitchChange = (checked: boolean) => {
        setIsChangePassword(checked);
    };

    // Call API to change password
    const handleChangePassword = async (credentials: any) => {
        try {
            setLoading(true);
            const response = await changePassword(user!.idUser, {
                currentPassword: credentials.currentPassword,
                newPassword: credentials.newPassword,
            });
            if (response) {
                messageApi.success("Updated User Information Successfully!");
            }
        } catch (error: any) {
            console.log("error ", error);
            messageApi.error("Updated Password Failed!");
        } finally {
            setLoading(false);
            setIsChangePassword(false);
        }
    };

    const handleOnclickMenuItems: MenuProps["onClick"] = (e: any) => {
        navigate(`/${e.key}`);
    };

    const fetchUserDetailData = async () => {
        try {
            const response = await getUserProfile(user!.idUser);
            if (response) {
                setUserDetail(response);
            }
        } catch (error) {
            console.log("error ", error);
        }
    };

    useEffect(() => {
        // Fetch user detail information
        fetchUserDetailData();
    }, []);

    useEffect(() => {
        form.setFieldsValue(userDetail);
    }, [userDetail]);

    return (
        <>
            {contextHolder}
            <div className="flex justify-center gap-10 mx-12 mb-8 min-h-[600px]">
                <div className="basis-1/3">
                    <div className="h-full px-3 flex flex-col items-center bg-purple-200 rounded-lg">
                        {/* AVARTAR */}
                        <div className="w-full flex flex-col items-center justify-center basis-1/2 gap-5 py-6">
                            <div className="w-[15rem] h-[15rem] flex items-center justify-center rounded-full bg-purple-400 text-3xl font-bold">
                                <p>{user?.userName[0].toUpperCase()}</p>
                            </div>
                            <h1 className="font-bold text-2xl">
                                {userDetail?.userName}
                            </h1>
                        </div>
                        <Divider />
                        <div className="w-full basis-1/2 pt-4">
                            <Menu
                                className="bg-purple-200 font-bold"
                                defaultSelectedKeys={["profile"]}
                                onClick={handleOnclickMenuItems}
                            >
                                <Menu.Item key="profile">Profile</Menu.Item>
                                <Menu.Item key="mycourses">
                                    My Courses
                                </Menu.Item>
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className="basis-2/3 border-[1px] border-gray-200 rounded-lg">
                    <Form
                        form={form}
                        className="p-4 flex flex-col gap-5"
                        name="edit-detail-form"
                        onFinish={handleSave}
                        layout="vertical"
                    >
                        <div className="flex justify-center gap-5">
                            <Form.Item
                                className="basis-1/2"
                                label="Full Name"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your fullname!",
                                    },
                                ]}
                            >
                                <Input
                                    disabled={!isEdit}
                                    className="py-3"
                                    placeholder={userDetail?.fullName}
                                />
                            </Form.Item>
                            <Form.Item
                                className="basis-1/2"
                                label="UserName"
                                name="userName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your UserName!",
                                    },
                                ]}
                            >
                                <Input
                                    disabled
                                    className="py-3"
                                    placeholder={userDetail?.fullName}
                                />
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
                                        message:
                                            "Please type correct email format!",
                                    },
                                ]}
                            >
                                <Input
                                    disabled={!isEdit}
                                    className="py-3"
                                    placeholder={userDetail?.email}
                                />
                            </Form.Item>
                            <Form.Item
                                className="basis-1/2"
                                label="Phone Number"
                                name="phoneNumber"
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
                                    disabled={!isEdit}
                                    className="py-3"
                                    placeholder={userDetail?.phoneNumber}
                                />
                            </Form.Item>
                        </div>

                        {isEdit ? (
                            <div className="flex gap-4">
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
                                <Form.Item>
                                    <Button
                                        className="font-bold"
                                        color="yellow"
                                        variant="solid"
                                        htmlType="button"
                                        onClick={() => setIsEdit(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </div>
                        ) : (
                            <Button
                                className="font-bold w-[3.9rem]"
                                color="purple"
                                variant="solid"
                                htmlType="button"
                                onClick={handleIsEditChange}
                            >
                                Edit
                            </Button>
                        )}
                    </Form>
                    <div className="p-4 flex  gap-5">
                        <h1 className="font-bold">Change Password</h1>{" "}
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: "#6d28d2",
                                },
                            }}
                        >
                            <Switch onChange={handleSwitchChange} />
                        </ConfigProvider>
                    </div>

                    {isChangePassword && (
                        <Form
                            layout="vertical"
                            className="p-4 flex flex-col gap-5"
                            onFinish={handleChangePassword}
                        >
                            <div className="flex justify-center gap-5">
                                <Form.Item
                                    className="basis-1/2"
                                    label="Current Password"
                                    name="currentPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter your new password!",
                                        },
                                        {
                                            min: 5,
                                            message:
                                                "The password has at least 8 characters!",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        className="py-3"
                                        placeholder="Current password"
                                    />
                                </Form.Item>
                                <Form.Item className="basis-1/2 flex items-start mt-8">
                                    <Button
                                        className="font-bold"
                                        color="purple"
                                        variant="solid"
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Change
                                    </Button>
                                </Form.Item>
                            </div>
                            <div className="flex justify-center gap-5">
                                <Form.Item
                                    className="basis-1/2"
                                    label="New Password"
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter your new password!",
                                        },
                                        {
                                            min: 8,
                                            message:
                                                "The password has at least 8 characters!",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        className="py-3"
                                        placeholder="New password"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="basis-1/2"
                                    label="Confirm New Password"
                                    name="newConfirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please confirm your new password!",
                                        },
                                        checkConfirmNewPassword,
                                    ]}
                                >
                                    <Input.Password
                                        className="py-3"
                                        placeholder="Confirm new password"
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
