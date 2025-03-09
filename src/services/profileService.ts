import axios from "axios";

// Cấu hình Axios instance
export const API = axios.create({
    baseURL: "https://coursesystem.azurewebsites.net",
    withCredentials: true, // Nếu API dùng cookies để auth
    headers: {
        "Content-Type": "application/json",
    },
});

// Middleware: Tự động đính kèm token vào headers cho mọi request
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Middleware: Xử lý lỗi response, ví dụ tự động refresh token (nếu API hỗ trợ)
// API.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response?.status === 401) {
//             console.warn(
//                 "Token hết hạn hoặc không hợp lệ, có thể cần đăng nhập lại!"
//             );
//             // Gọi API refresh token nếu có
//         }
//         return Promise.reject(error.response?.data || error.message);
//     }
// );

// Get User Profile API
export const getUserProfile = async (userId: string) => {
    try {
        const response = await API.get(`/Profile/get-profile`);
        console.log(`✅ Get profile của người dùng ID ${userId} thành công`);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi get profile của người dùng:", error);
        throw error;
    }
};

// Change Password API
export const changePassword = async (userId: string, updatedData: any) => {
    try {
        const response = await API.put(
            `/Profile/${userId}/change-password`,
            updatedData
        );
        console.log(
            `✅ Cập nhật password của người dùng ID ${userId} thành công`
        );
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật người dùng:", error);
        throw error;
    }
};

// Update User Profile API
export const updateUserProfile = async (userId: string, updatedData: any) => {
    try {
        const response = await API.put(`/Profile/update-profile`, updatedData);
        console.log(
            `✅ Cập nhật profile của người dùng ID ${userId} thành công`
        );
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật người dùng:", error);
        throw error;
    }
};
