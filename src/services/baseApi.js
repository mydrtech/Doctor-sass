import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://medicare-pro-backend.vercel.app",
        prepareHeaders: (headers, { getState }) =>{
            const token = getState().auth?.token || localStorage.getItem("token");
            if(token){
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: () => ({})
})