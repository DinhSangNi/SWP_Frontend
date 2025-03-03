import { createSlice } from "@reduxjs/toolkit";
import { checkTokenExpiry } from "@/utils/authUtils"; // Import hàm checkTokenExpiry

type AuthUser = {
    idUser: string;
    userName: string;
    role: string;
    status: string;
    token?: string;
    expiration?: string;
};

type InitState = {
    user: AuthUser | null;
};

const initialState: InitState = {
    user: null,
};

console.log("Initial state:", initialState); // Debug initial state

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;

            localStorage.setItem("token", action.payload.token); // Lưu token vào localStorage
            localStorage.setItem("user", JSON.stringify(action.payload)); // Lưu user vào localStorage
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token"); // Xóa token khi đăng xuất
            localStorage.removeItem("user"); // Xóa user khi đăng xuất
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
