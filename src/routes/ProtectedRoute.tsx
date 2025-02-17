import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }: { roles: string[] }) => {
    const user = useSelector((state: RootState) => state.auth.user);



    // if(user.role === 'Admin'){
    //     return <Navigate to="/dashboard" replace />;
    // } else {
    //     return <Navigate to="/" replace />;
    // }

    // Nếu người dùng có quyền, render các route con bằng Outlet
    return <Outlet />;
};

export default ProtectedRoute;