import { IUserInfo } from '@/core/api/model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = IUserInfo

const initialState: UserState = {} as IUserInfo

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
