import axios from "axios";
import { toast } from "react-toastify";

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
// API.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.status === 401) {
//             console.warn(
//                 "Token hết hạn hoặc không hợp lệ, có thể cần đăng nhập lại!"
//             );
//             // Gọi API refresh token nếu có
//             toast.error("Your token expired! Please re-authenticate!");

//         }
//         return Promise.reject(error.response?.data || error.message);
//     }
// );

// Get all courses
export const getAllCourses = async () => {
    try {
        const response = await API.get("/Home/all-courses");
        console.log("✅ Get all courses successfully:", response.data);
        return response;
    } catch (error) {
        console.error("❌ Error when getting all courses:", error);
        throw error;
    }
};

// Create course
export const createCourse = async (courseData: any) => {
    try {
        const response = await API.post("/Course/create", courseData);
        console.log("✅ Create course successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error when creating course:", error);
        throw error;
    }
};

// Edit khóa học
export const editCourse = async (courseId: string, updateCourse: any) => {
    try {
        const response = await API.put(
            `/Course/edit/${courseId}`,
            updateCourse
        );
        console.log("✅ Edit course successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error when editing course:", error);
        throw error;
    }
};

// Delete khóa học
export const deleteCourse = async (courseId: string) => {
    try {
        const response = await API.delete(`/Course/delete/${courseId}`);
        console.log("✅ Delete course successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error when deleting course:", error);
        throw error;
    }
};

// Get course by ID
export const getCourseById = async (courseId: string) => {
    try {
        const response = await API.get(`/Course/information/${courseId}`);
        console.log("✅ Get course by ID successfully:", response.data);
        return response;
    } catch (error) {
        console.error("❌ Error when getting course by ID:", error);
        throw error;
    }
};

// Search course
export const searchCourse = async (query: string) => {
    try {
        const response = await API.get(`/Home/search/${query}`);
        console.log(
            "✅ Search course by course name successfully:",
            response.data
        );
        return response.data;
    } catch (error) {
        console.error("❌ Error when search course by course name:", error);
        throw error;
    }
};

// Get my courses
export const getMyCources = async () => {
    try {
        const response = await API.get("/Course/my-courses");
        console.log("✅ Get my course successfully:", response);
        return response;
    } catch (error) {
        console.error("❌ Error when search course by course name:", error);
        throw error;
    }
};
