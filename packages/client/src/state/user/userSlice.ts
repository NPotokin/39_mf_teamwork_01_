import { IUpdateUserResponse, IUserInfo } from '@/core/api/model'
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
    updateUser: (state, action: PayloadAction<IUpdateUserResponse>) => {
      return { ...state, ...action.payload }
    },
    updateUserAvatar: (state, action: PayloadAction<string>) => {
      return { ...state, avatar: action.payload }
    },
    resetUser: () => initialState,
  },
})

export const { setUser, resetUser, updateUser, updateUserAvatar } =
  userSlice.actions
export default userSlice.reducer
