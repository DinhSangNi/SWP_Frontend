import { MenuItems } from "@/stores/enums";
import { Button, Menu, MenuProps } from "antd";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState([
        location.pathname.split("/")[2],
    ]);

    const handleOnclickMenuItems: MenuProps["onClick"] = (e: any) => {
        setSelectedItem([e.key]);
        navigate(`/dashboard/${e.key}`);
    };

    return (
        <div className="h-full w-full flex flex-col gap-10 bg-purple-200 border-r-2 border-purple-300">
            {/* LOGO */}
            <div className="flex justify-center py-5 ">
                <div className="w-5/6">
                    <img
                        className="cursor-pointer"
                        src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                        alt="logo"
                    />
                </div>
            </div>
            {/* AVARTAR */}
            <div className="h-1/6 w-full bg-purple-300 flex items-center">
                <div className="pl-6 flex items-center justify-start gap-3 py-2">
                    <div className="font-bold px-5 py-2.5 bg-black text-[1.5rem] text-white rounded-full border-[1px] border-black">
                        N
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.3rem]">New User</h2>
                        <p className="text-[0.9rem]">Administrator</p>
                    </div>
                </div>
            </div>

            {/* MENU */}
            <Menu
                mode="inline"
                defaultSelectedKeys={["teacher"]}
                defaultOpenKeys={["user"]}
                selectedKeys={selectedItem}
                className="bg-purple-200"
                onClick={handleOnclickMenuItems}
            >
                <Menu.SubMenu key="user" title="User">
                    <Menu.Item key={MenuItems.teachers}>Teachers</Menu.Item>
                    <Menu.Item key={MenuItems.students}>Students</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key={MenuItems.courses}>Courses</Menu.Item>
                <Menu.Item key={MenuItems.coursesEnrollments}>
                    Courses Enrollments
                </Menu.Item>
            </Menu>
            <div className="h-full flex flex-col justify-end">
                <Button
                    className="mb-10 py-5 flex items-center"
                    onClick={() => navigate("/")}
                >
                    <IoIosLogOut className="font-bold text-[1.2rem]" />
                    <p className="">Go Home</p>
                </Button>
            </div>
        </div>
    );
};

export default SideBar;
