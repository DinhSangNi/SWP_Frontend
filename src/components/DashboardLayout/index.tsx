import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";

type Props = {};

const DashboardLayout = (props: Props) => {
    return (
        <div className="flex h-full w-full gap-5">
            {/* SIDEBAR */}
            <div className="w-1/6 h-full">
                <SideBar />
            </div>
            {/* MAIN_CONTENT */}
            <div className="w-full flex justify-center">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
