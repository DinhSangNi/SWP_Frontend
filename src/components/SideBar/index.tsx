import { MenuItems } from "@/stores/enums";
import { Button, Menu, MenuProps } from "antd";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

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

    const user = useSelector((state: RootState) => state.auth.user);
    console.log("user", user);
    const userInfo = localStorage.getItem("user");
    console.log("userInfo", JSON.parse(userInfo || "{}"));
    const { userName } = JSON.parse(userInfo || "{}");
    console.log("userName", userName);

    // if(user.role !== 'Admin'){
    //      navigate('/');;
    // }

    //    console.log("role", user);

    return (
        <div className="flex flex-col w-full h-full gap-10 bg-purple-200 border-r-2 border-purple-300">
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

            <div className="flex items-center w-full bg-purple-300 h-1/6">
                <div className="flex items-center justify-start gap-3 py-2 pl-6">
                    <div className="font-bold px-5 py-2.5 bg-black text-[1.5rem] text-white rounded-full border-[1px] border-black">
                        N
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.3rem]">{userName}</h2>
                        <p className="text-[0.9rem]">
                            {user?.role === "Admin"
                                ? "Administrator"
                                : user?.role}
                        </p>
                    </div>
                </div>
            </div>

            {/* MENU */}
            <Menu
                mode="inline"
                defaultSelectedKeys={["teacher"]}
                defaultOpenKeys={["user"]}
                selectedKeys={selectedItem}
                className="bg-purple-200 font-bold"
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

            <div className="flex flex-col justify-end h-full">
                <Button
                    className="flex items-center py-5 mb-10"
                    onClick={() => navigate("/")}
                >
                    <IoIosLogOut className="font-bold text-[1.2rem]" />
                    <p className="font-bold">Go Home</p>
                </Button>
            </div>
        </div>
    );
};

export default SideBar;
