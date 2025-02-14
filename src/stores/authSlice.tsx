import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/stores/types";

type AuthState = {
    user: User | null;
};

const initialState: AuthState = {
    user: {
        id: "",
        userName: "",
        role: "",
        status: "",
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
