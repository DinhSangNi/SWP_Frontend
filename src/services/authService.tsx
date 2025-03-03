import axios from "axios";

const API = axios.create({
    baseURL: "https://coursesystem.azurewebsites.net",
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

export const loginAuth = async (userData: any) => {
    try {
        const response = await API.post("/Auth/login", userData);
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Login error:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export const signup = async (userData: any) => {
    console.log("Sending data to server:", userData);
    const { FullName, username, email, password, phonenumber } = userData;
    try {
        const response = await API.post("/Auth/register", {
            FullName,
            username,
            email,
            password,
            phonenumber,
        });
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error: any) {
        console.error(
            "Error from server:",
            error.response?.data || error.message
        );
        throw error.response?.data || error.message;
    }
};

export const forgotPassword = async (email: string) => {
    const response = await API.post("/Auth/forgot-password", {
        Email: email,
    });
    if (response) {
        console.log("Response from server:", response.data);
        return response.data;
    }
};

export const resetPassword = async (
    email: string,
    verificationCode: string,
    newPassword: string
) => {
    const response = await API.put("/Auth/reset-password", {
        Email: email,
        verificationCode: verificationCode,
        newPassword: newPassword,
    });
    if (response) {
        console.log("Response from server:", response.data);
        return response.data;
    }
};
