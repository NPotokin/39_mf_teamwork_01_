import { ICreateUser, ILoginRequestData, IUserInfo } from '@/core/api/model'
import { getUser, signin, logout, signup } from '@/core/services/auth.service'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/ ' }),
  endpoints: build => ({
    signin: build.mutation<IUserInfo | undefined, ILoginRequestData>({
      queryFn: async data => {
        const user = await signin(data)
        return { data: user }
      },
    }),
    signup: build.mutation<IUserInfo | undefined, ICreateUser>({
      queryFn: async (data: ICreateUser) => {
        const user = await signup(data)
        return { data: user }
      },
    }),
    logout: build.mutation<boolean, void>({
      queryFn: async () => {
        const result = await logout()
        return { data: result }
      },
    }),
    getUser: build.mutation<IUserInfo, void>({
      queryFn: async () => {
        try {
          const user = await getUser()
          return { data: user }
        } catch (error: unknown) {
          const err = axios.isAxiosError(error) ? error.response?.data : error
          return { error: err }
        }
      },
    }),
  }),
})

export const {
  useSigninMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetUserMutation,
} = authApiSlice
