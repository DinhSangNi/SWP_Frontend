import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BE_BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

// Đã xóa interceptor request
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
