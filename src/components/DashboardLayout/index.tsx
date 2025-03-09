import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex h-full w-full">
            {/* SIDEBAR */}
            <div className="w-1/5 h-full">
                <SideBar />
            </div>
            {/* MAIN_CONTENT */}
            <div className="w-4/5 px-5 flex justify-center">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
