import axiosInstance from "@/configs/axiosInstance";
import { AppDispatch, RootState } from "@/stores/store";
import { logout } from "@/stores/authSlice";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import {
    Badge,
    Button,
    Dropdown,
    Menu,
    MenuProps,
    message,
    Modal,
    Space,
} from "antd";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "../Search";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItems } from "@/stores/enums";
import PopoverNotify from "../PopoverNotify";
import { uppercaseFirstLetter } from "@/utils/formatUtils";
// import { useNotification } from "@/hooks/useNotification";
import { toast } from "react-toastify";

const { Item } = Menu;

type Props = {
    setLoading: (values: boolean) => void;
};

type MenuItem = Required<MenuProps>["items"][number];

const mobileMenuItems: MenuItem[] = [
    {
        key: MenuItems.login,
        label: "Login",
    },
    {
        key: MenuItems.signup,
        label: "Sign Up",
    },
    {
        type: "divider",
    },
    {
        key: MenuItems.logout,
        label: "Logout",
    },
];

const Header = ({ setLoading }: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [messageApi, contextHolder] = message.useMessage();

    const userInfo = localStorage.getItem("user");
    const { userName } = JSON.parse(userInfo || "{}");

    // const { setMessage } = useNotification();

    const handleLogout = async () => {
        try {
            setLoading(true);
            setIsOpenModal(false);
            const response = await axiosInstance.post("/Auth/logout", {});

            if (response.status === 200) {
                dispatch(logout());
                localStorage.removeItem("token");
                toast.success("Logout successfully!", {
                    position: "top-center",
                });
                navigate("/");
            }
        } catch (error) {
            messageApi.error("Logout failed!");
            console.log("error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOnclickMenuItems: MenuProps["onClick"] = (e) => {
        if (e.key === MenuItems.logout) {
            setIsOpenModal(true);
            return;
        }
        navigate(`/${e.key}`);
    };

    const userDropdownItems = [
        {
            label: (
                <Link
                    to={`/${MenuItems.profile}`}
                    className="flex justify-start items-center gap-2 px-4 font-bold"
                >
                    <CgProfile className="text-[1rem] text-black" />{" "}
                    <p>Profile</p>
                </Link>
            ),
            key: "0",
        },
        user?.role === "Admin" && {
            label: (
                <Link
                    to={`/${MenuItems.dashBoard}/teachers`}
                    className="px-4 font-bold"
                >
                    Dashboard
                </Link>
            ),
            key: "1",
        },
        {
            label: (
                <Link
                    to={`/${MenuItems.myCourses}`}
                    className="flex justify-start items-center gap-2 px-4 font-bold"
                >
                    <HiOutlineAcademicCap className="text-[1rem] text-black" />
                    <p>My Courses</p>
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
                    className="flex justify-start items-center gap-2 px-4 font-bold"
                    onClick={() => setIsOpenModal(true)}
                >
                    <LuLogOut className="text-[1rem] font-bold" />
                    Logout
                </button>
            ),
            key: "4",
        },
    ];

    return (
        <>
            {contextHolder}
            <header className="w-full relative border-b-[1px] border-b-[#ddd] shadow-md">
                <div className="w-full flex items-center justify-evenly pb-[0.5rem]">
                    {/* LEFTSIDE */}
                    <div
                        className="font-bold cursor-pointer hover:opacity-60"
                        onClick={() => navigate("/")}
                    >
                        {/* LOGO IMG */}
                        <img
                            className="w-24 h-16"
                            src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                            alt="logo"
                        />
                    </div>
                    {/* SEARCHFORM */}
                    <div className="basis-4/5">
                        <SearchForm />
                    </div>
                    {/* RIGHTSIDE */}
                    {isAboveMediumScreens ? (
                        <>
                            {user && (
                                // NOTIFICATIONS
                                <div className="">
                                    <PopoverNotify>
                                        <Badge
                                            className="relative mt-1 cursor-pointer hover:text-purple-700"
                                            count={0}
                                            size="default"
                                        >
                                            <GoBell className="text-[1.6rem]" />
                                        </Badge>
                                    </PopoverNotify>
                                </div>
                            )}
                            {/* LOGIN SIGNUP BUTTONS */}
                            {!user ? (
                                <>
                                    <Link to="/login">
                                        <Button
                                            className=" py-5 px-5 border-solid border-[1px] border-[#6d28d2] font-bold"
                                            color="purple"
                                            variant="filled"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button
                                            className=" px-4 py-5 font-bold text-white"
                                            color="purple"
                                            variant="solid"
                                        >
                                            Sign up
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <div className="">
                                    <Dropdown
                                        menu={{ items: userDropdownItems }}
                                        trigger={["click"]}
                                    >
                                        <a
                                            className="text-center"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <Space className="hover:text-[#6d28d2] text-black">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="font-bold px-4 py-2 bg-purple-300 rounded-full">
                                                        {uppercaseFirstLetter(
                                                            user
                                                                .userName?.[0] ||
                                                                userName?.[0]
                                                        )}
                                                    </div>
                                                </div>
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            )}
                        </>
                    ) : (
                        <Button
                            className="px-2 py-4 border-none rounded-full bg-secondary-500"
                            color="purple"
                            variant="text"
                            onClick={() => setIsMenuToggled(!isMenuToggled)}
                        >
                            <Bars3Icon className="h-6 w-6 text-[#6d28d2]" />
                        </Button>
                    )}
                </div>

                {/* Logout Modal */}
                <Modal
                    title="CONFIRM"
                    open={isOpenModal}
                    onOk={handleLogout}
                    onCancel={() => setIsOpenModal(false)}
                >
                    <p className="flex gap-2">
                        <ExclamationCircleIcon className="w-6 h-6 text-orange-400" />
                        Are you sure you want to{" "}
                        <span className="px-0 mx-0 font-bold">Logout</span>?
                    </p>
                </Modal>

                {/* Mobile Menu Modal */}
                <AnimatePresence>
                    {!isAboveMediumScreens && isMenuToggled && (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0 }}
                            transition={{ duration: 0.3 }}
                            exit="exit"
                            variants={{
                                hidden: { opacity: 0, x: "100%" },
                                visible: { opacity: 1, x: 0 },
                                exit: { opacity: 0, x: "100%" },
                            }}
                            className="fixed right-0 bottom-0 z-40 h-full w-[200px] bg-purple-200 drop-shadow-xl"
                        >
                            {/* CLOSE ICON */}
                            <div className="flex justify-end p-5">
                                <Button
                                    variant="text"
                                    color="purple"
                                    className="px-1 py-2 rounded-full"
                                    onClick={() =>
                                        setIsMenuToggled(!isMenuToggled)
                                    }
                                >
                                    <XMarkIcon className="w-6 h-6 font-bold text-gray-400" />
                                </Button>
                            </div>

                            {/* MENU ITEMS */}
                            <div>
                                {!user ? (
                                    <Menu
                                        className="bg-purple-200"
                                        onClick={handleOnclickMenuItems}
                                        mode="inline"
                                        items={mobileMenuItems}
                                    />
                                ) : (
                                    <div>
                                        <div className="flex justify-start gap-3 py-2 pl-4 bg-purple-300">
                                            <div className="px-4 py-2 font-bold bg-purple-200 rounded-full">
                                                {user.userName?.[0] ||
                                                    userName?.[0]}
                                            </div>
                                            <div>
                                                <h2 className="font-bold">
                                                    {user?.userName || userName}
                                                </h2>
                                                <p className="text-xs">
                                                    Welcome back
                                                </p>
                                            </div>
                                        </div>
                                        {/* MENU */}
                                        <Menu
                                            className="font-bold bg-purple-200 border-none"
                                            onClick={handleOnclickMenuItems}
                                        >
                                            <Item key={MenuItems.dashBoard}>
                                                Dashboard
                                            </Item>
                                            <Item key={MenuItems.profile}>
                                                Profile
                                            </Item>
                                            <Item key={MenuItems.myCourses}>
                                                My Courses
                                            </Item>
                                            <Menu.Divider />
                                            <Item key={MenuItems.logout}>
                                                Logout
                                            </Item>
                                        </Menu>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default Header;
