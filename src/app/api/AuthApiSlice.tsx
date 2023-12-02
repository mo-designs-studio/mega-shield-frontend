import { LoginInfo, RegisterInfo, User } from "@/types"
import { apiSlice } from "./api"

const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<{ user: User }, any>({
      query: () => ({
        url: "/users/me",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    login: builder.mutation<{ user: User }, LoginInfo>({
      query: info => ({
        url: "/auth/login",
        method: "POST",
        body: JSON.stringify(info),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "package",
        "subServices",
      ],
    }),
    // register: builder.mutation<
    //   { user: User },
    //   RegisterInfo
    // >({
    //   query: info => ({
    //     url: "/auth/register",
    //     method: "POST",
    //     body: JSON.stringify(info),
    //     credentials: "include",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   }),
    // }),
  }),
})

// export const {
//   // useGetMeQuery,
//   // useLoginMutation,
//   // useRegisterMutation,
// } = authApi
