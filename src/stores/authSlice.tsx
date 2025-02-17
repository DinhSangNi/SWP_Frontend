import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { checkTokenExpiry } from "@/utils/authUtils"; // Import hàm checkTokenExpiry

const initialState = {
    user: checkTokenExpiry(),
};

console.log("Initial state:", initialState); // Debug initial state

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('token', action.payload.token); // Lưu token vào localStorage
            console.log("Logged in user:",JSON.stringify(action.payload)); // Debug
            // localStorage.setItem('user', JSON.stringify(action.payload)); // Lưu user vào localStorage
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token'); // Xóa token khi đăng xuất
            localStorage.removeItem('user'); // Xóa user khi đăng xuất
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;