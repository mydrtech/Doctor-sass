import { configureStore } from "@reduxjs/toolkit";
import { doctorApiSlice } from "../docQuery/doctorApiSlice";

export const doc = configureStore({
  reducer: {
    [doctorApiSlice.reducerPath]: doctorApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doctorApiSlice.middleware),
});
