import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux"


type User = {
    id: string;
    name: string;
    role: "admin" | "user",
}

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null as User | null },
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        logout(state) {
            state.user = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export const store = configureStore({
    reducer: { auth: authSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// use these two on every page instead of plain useDispatch / useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();