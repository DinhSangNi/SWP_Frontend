import axios from "axios";

// Cấu hình Axios instance
const API = axios.create({
    baseURL: "https://coursesystem.azurewebsites.net",
    withCredentials: true, // Nếu API dùng cookies để auth
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn(
                "Token hết hạn hoặc không hợp lệ, có thể cần đăng nhập lại!"
            );
            // Gọi API refresh token nếu có
        }
        return Promise.reject(error.response?.data || error.message);
    }
);

// 🟢 API Lấy tất cả người dùng
export const getAllUser = async () => {
    try {
        const response = await API.get("/User/all-users");
        // console.log("📌 getAllUser response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách người dùng:", error);
        throw error;
    }
};

// API lấy chi tiết người dùng
export const getUserById = async (userId: string) => {
    try {
        const response = await API.get(`/User/${userId}`);
        console.log("✅ Lấy thông tin người dùng thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy thông tin người dùng:", error);
        throw error;
    }
};

// 🟢 API Thêm người dùng
export const addUser = async (userData: any) => {
    try {
        const response = await API.post("/User/add", userData);
        console.log("✅ Thêm người dùng thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi thêm người dùng:", error);
        throw error;
    }
};

// 🟢 API Xóa người dùng
export const deleteUser = async (userId: string) => {
    try {
        const response = await API.delete(`/User/delete/${userId}`);
        console.log(`✅ Xóa người dùng ID ${userId} thành công`);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi xóa người dùng:", error);
        throw error;
    }
};

// 🟢 API Cập nhật người dùng
export const updateUser = async (userId: string, updatedData: any) => {
    try {
        const response = await API.put(
            `/User/update-status/${userId}`,
            updatedData
        );
        console.log(`✅ Cập nhật người dùng ID ${userId} thành công`);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật người dùng:", error);
        throw error;
    }
};
