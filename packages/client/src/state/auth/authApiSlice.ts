import {
  ICreateUser,
  ILoginRequestData,
  ISignUpResponse,
  IUserInfo,
} from '@/core/api/model'
import { getUser, signin, logout, signup } from '@/core/services/auth.service'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/ ' }),
  endpoints: build => ({
    signin: build.mutation<IUserInfo | undefined, ILoginRequestData>({
      queryFn: async data => {
        try {
          const user = await signin(data)
          return { data: user }
        } catch (error: unknown) {
          return { error }
        }
      },
    }),
    signup: build.mutation<ISignUpResponse, ICreateUser>({
      queryFn: async (data: ICreateUser) => {
        try {
          const user = await signup(data)
          return { data: user }
        } catch (error: unknown) {
          const err = axios.isAxiosError(error) ? error.response?.data : error
          return { error: err }
        }
      },
    }),
    logout: build.mutation<void, void>({
      queryFn: async () => {
        await logout()
        return { data: undefined }
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
