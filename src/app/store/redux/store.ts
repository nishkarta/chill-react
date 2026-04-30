import { adminReducer } from "@features/admin/adminSlice";
import { homeReducer } from "@features/home/homeSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    home: homeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;