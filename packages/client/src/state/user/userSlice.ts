import { IUserInfo } from '@/core/api/model'
import { USER_DATA_KEY } from '@/core/services/auth.service'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = IUserInfo

const userData = localStorage.getItem(USER_DATA_KEY)
const initialState: UserState = userData ? JSON.parse(userData) : {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserInfo>) => action.payload,
    resetUser: () => initialState,
  },
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
