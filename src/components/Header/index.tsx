import axiosInstance from "@/configs/axiosInstance";
import { AppDispatch, RootState } from "@/stores/store";
import { logout } from "@/stores/authSlice";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { Badge, Button, Dropdown, message, Modal, Space } from "antd";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "../Search";

type Props = {
    setLoading: (values: boolean) => void;
};

const Header = ({ setLoading }: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = async () => {
        try {
            setLoading(true);
            setIsOpenModal(false);
            const response = await axiosInstance.post("/Auth/logout", {});

            if (response.status === 200) {
                dispatch(logout());
                message.success("Logout successfully!");
                navigate("/");
            }
        } catch (error) {
            errorMessage();
            console.log("here");
        } finally {
            setLoading(false);
        }
    };

    const errorMessage = () => {
        message.error("Logout failed!");
    };
    return (
        <>
            <header className="w-full relative border-b-[1px] border-b-[#ddd] shadow-md">
                <div className="w-11/12 mx-auto flex items-center justify-between pb-[0.5rem] gap-4">
                    <div className="flex gap-4 font-bold">
                        <img
                            className="h-16 w-24"
                            src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                            alt="logo"
                        />
                    </div>
                    <div className="grow">
                        <SearchForm />
                    </div>
                    <div className="flex items-center justify-center gap-x-[1.8rem] font-bold">
                        <div>
                            <Badge
                                className="mt-1 relative hover:text-purple-700"
                                count={1}
                                size="default"
                            >
                                <GoBell className="text-[1.6rem]" />
                            </Badge>
                        </div>
                        <div>
                            <Badge
                                // className="mt-1 relative before:absolute before:content-[''] before:h-[1.6rem] before:w-[1.6rem] before:opacity-50 before:px-6 before:py-6 before:-top-3 before:-left-3 before:rounded-md before:hover:bg-purple-200"
                                className="mt-1 relative hover:text-purple-700"
                                count={1}
                                size="default"
                            >
                                <MdOutlineShoppingCart className="text-[1.6rem]" />
                            </Badge>
                        </div>
                        {user ? (
                            <div className="flex items-center justify-center gap-x-[0.5rem]">
                                <Link to="/login">
                                    <Button
                                        className="py-5 px-5 border-solid border-[1px] border-[#6d28d2] font-bold"
                                        color="purple"
                                        variant="filled"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button
                                        className="py-5 px-4 text-white font-bold"
                                        color="purple"
                                        variant="solid"
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                label: (
                                                    <Link
                                                        to=""
                                                        className="px-4"
                                                    >
                                                        Profile
                                                    </Link>
                                                ),
                                                key: "0",
                                            },
                                            {
                                                label: (
                                                    <Link
                                                        to=""
                                                        className="px-4"
                                                    >
                                                        Dashboard
                                                    </Link>
                                                ),
                                                key: "1",
                                            },
                                            {
                                                label: (
                                                    <Link
                                                        to=""
                                                        className="px-4"
                                                    >
                                                        My Courses
                                                    </Link>
                                                ),
                                                key: "2",
                                            },
                                            {
                                                type: "divider",
                                                key: "3",
                                            },
                                            {
                                                label: (
                                                    <button
                                                        className="px-4"
                                                        onClick={() =>
                                                            setIsOpenModal(true)
                                                        }
                                                    >
                                                        Logout
                                                    </button>
                                                ),
                                                key: "4",
                                            },
                                        ],
                                    }}
                                    trigger={["click"]}
                                >
                                    <a
                                        className="text-center"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <Space>
                                            <FaCircleUser className="text-black text-[1.7rem] " />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </div>
                <Modal
                    // className={
                    //   loading
                    //     ? `before:bg-white before:content-[''] before:w-full before:h-full before:absolute before:z-[100] before:opacity-80`
                    //     : ''
                    // }
                    title="CONFIRM"
                    open={isOpenModal}
                    onOk={handleLogout}
                    onCancel={() => setIsOpenModal(false)}
                >
                    <p className="flex gap-2">
                        <ExclamationCircleIcon className="h-6 w-6 text-orange-400" />
                        Are you sure you want to{" "}
                        <span className="font-bold px-0 mx-0">Logout</span>?
                    </p>
                </Modal>
            </header>
        </>
    );
};

export default Header;
