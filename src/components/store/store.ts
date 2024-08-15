import { configureStore } from "@reduxjs/toolkit";
import slicer from "../Slicer/dataSlicer";

const store = configureStore({
    reducer: {
        userData: slicer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
