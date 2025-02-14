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
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "../Search";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItems } from "@/stores/enums";
import MenuItem from "antd/es/menu/MenuItem";
import MenuDivider from "antd/es/menu/MenuDivider";

const { Item } = Menu;

type Props = {
    setLoading: (values: boolean) => void;
};

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = [
    {
        key: MenuItems.login,
        label: "Login",
        icon: "",
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
        icon: "",
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

    const handleLogout = async () => {
        try {
            setLoading(true);
            setIsOpenModal(false);
            const response = await axiosInstance.post("/Auth/logout", {});

            if (response.status === 200) {
                dispatch(logout());
                messageApi.success("Logout successfully!");
                navigate("/");
            }
        } catch (error) {
            messageApi.error("Logout failed!");
            console.log("here");
        } finally {
            setLoading(false);
        }
    };

    const handleOnclickMenuItems: MenuProps["onClick"] = (e: any) => {
        if (e.key === MenuItems.logout) {
            setIsOpenModal(true);
            return;
        }

        navigate(`/${e.key}`);

        console.log("click ", e.key);
    };
    return (
        <>
            {contextHolder}
            <header className="w-full relative border-b-[1px] border-b-[#ddd] shadow-md">
                <div className="w-11/12 mx-auto flex items-center justify-between pb-[0.5rem] gap-7 md:gap-4">
                    {/* LEFTSIDE */}
                    <div className="flex gap-4 font-bold">
                        <img
                            className="h-16 w-24"
                            src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                            alt="logo"
                        />
                    </div>
                    {/* SEARCHFORM */}
                    <div className="grow">
                        <SearchForm />
                    </div>
                    {/* RIGHTSIDE */}
                    {isAboveMediumScreens ? (
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
                                                            to={`/${MenuItems.profile}`}
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
                                                            to={`/${MenuItems.dashBoard}`}
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
                                                            to={`/${MenuItems.myCourses}`}
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
                                                                setIsOpenModal(
                                                                    true
                                                                )
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
                                            <Space className="hover:text-[#6d28d2] text-black">
                                                <FaCircleUser className="text-[1.7rem] " />
                                                <h2 className="cursor-default">
                                                    Hi, New User
                                                </h2>
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button
                            className="rounded-full bg-secondary-500 py-4 px-2 border-none"
                            color="purple"
                            variant="text"
                            onClick={() => setIsMenuToggled(!isMenuToggled)}
                        >
                            <Bars3Icon className="h-6 w-6 text-[#6d28d2]" />
                        </Button>
                    )}
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
                {/* MENUMODAL */}
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
                                    <XMarkIcon className="h-6 w-6 text-gray-400 font-bold" />
                                </Button>
                            </div>

                            {/* MENU ITEMS */}
                            <div>
                                {user ? (
                                    <Menu
                                        className="bg-purple-200"
                                        onClick={handleOnclickMenuItems}
                                        mode="inline"
                                        items={menuItems}
                                    />
                                ) : (
                                    <div className="">
                                        <div className="pl-4 flex justify-start gap-3 py-2 bg-purple-300">
                                            <div>
                                                {user ? (
                                                    <img src="" alt="" />
                                                ) : (
                                                    <div className="font-bold px-4 py-2 bg-black text-white rounded-full border-[1px] border-black">
                                                        N
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h2 className="font-bold">
                                                    Hi, New User
                                                </h2>
                                                <p className="text-xs">
                                                    Welconm back.
                                                </p>
                                            </div>
                                        </div>
                                        <Menu
                                            className="bg-purple-200 border-none font-bold"
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
                                            <MenuDivider />
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
