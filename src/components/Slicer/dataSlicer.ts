import { createSlice } from "@reduxjs/toolkit";

interface userData {
    status: boolean;
}

const initialState: userData = {
    status: false,
};

export const slicer = createSlice({
    name: "userData",
    initialState,
    reducers: {
        loginStatus: (state) => {
            state.status = true;
        },
        logoutStatus: (state) => {
            state.status = false;
        },
    },
});

export const { loginStatus, logoutStatus } = slicer.actions;
export default slicer.reducer;
