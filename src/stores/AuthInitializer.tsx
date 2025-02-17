import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/stores/authSlice";
import { checkTokenExpiry } from "@/utils/authUtils"; // Import hàm checkTokenExpiry

const AuthInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = checkTokenExpiry(); // Kiểm tra token từ localStorage
        if (storedUser) {
            console.log("Restoring user session:", storedUser);
            dispatch(login(storedUser)); // Đưa user vào Redux store
        }
    }, [dispatch]);

    return null;
};

export default AuthInitializer;
