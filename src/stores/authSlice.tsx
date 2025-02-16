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
            state.user = action.payload;
            if(action.payload.token){
                localStorage.setItem('token', action.payload.token);
            }
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
