import { baseApi } from "../../services/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `api/v1/auth/login`,
                method: "POST",
                body: credentials,
            })
        })
    })
})

export const { useLoginMutation } = authApi;