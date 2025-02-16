import { createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "@/stores/types";

type AuthState = {
    user: null;
};

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action);
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
