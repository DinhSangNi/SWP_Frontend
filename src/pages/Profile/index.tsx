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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const fakeUserData = {
    fullName: "Test User",
    userName: "testuser",
    email: "testuser@gmail.com",
    phoneNumber: "1234567890",
};

type Props = {};

const Profile = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const fetchUserDetailData = async () => {
        try {
            const response = await getUserById(user?.idUser);
            console.log(response);
        } catch (error) {
            console.log("error ", error);
        }
    };

    // Call API to update user detail information
    const handleSave = async (credentials: any) => {
        try {
            setLoading(true);
            messageApi.success("Updated Successfully!");
        } catch (error: any) {
            console.log("error ", error);
            messageApi.error("Updated Failed!");
        } finally {
            setLoading(false);
            setIsEdit(false);
        }
    };

    const handleIsEditChange = () => {
        setIsEdit(true);
    };

    console.log("isEdit: ", isEdit);

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
        console.log("switch to ", checked);
    };

    const handleChangePassword = (credentials: any) => {};

    const handleOnclickMenuItems: MenuProps["onClick"] = (e: any) => {
        navigate(`/${e.key}`);
    };

    useEffect(() => {
        fetchUserDetailData();
    }, []);

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
                                {user?.userName}
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
                        className="p-4 flex flex-col gap-5"
                        name="edit-detail-form"
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
                                <Input
                                    disabled={!isEdit}
                                    className="py-3"
                                    placeholder={fakeUserData.fullName}
                                />
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
                                <Input
                                    disabled={!isEdit}
                                    className="py-3"
                                    placeholder="Username"
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
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item
                                className="basis-1/2"
                                label="Phone Number"
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
                                    disabled={!isEdit}
                                    className="py-3"
                                    placeholder="Phone Number"
                                />
                            </Form.Item>
                        </div>

                        {isEdit ? (
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
                                    <Input
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
                                    <Input
                                        className="py-3"
                                        placeholder="Confirm new password"
                                    />
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
                                    Change
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
