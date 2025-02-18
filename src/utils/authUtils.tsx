import { jwtDecode } from "jwt-decode";

// check tg hết hạn và valid token
export const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

        if (decoded.exp * 1000 < Date.now()) {
            console.warn("Token expired, removing from storage");
            localStorage.removeItem("token");
            return null;
        }

        return { token, userName: decoded.userName, role: decoded.role }; // Lưu thông tin user
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        return null;
    }
};
