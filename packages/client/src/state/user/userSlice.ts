import { IUserInfo } from '@/core/api/model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = {
  data: IUserInfo
}

const initialState: UserState = {
  data: {} as IUserInfo,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetched: (state, action: PayloadAction<IUserInfo>) => {
      state.data = action.payload
    },
    userReset: () => initialState,
  },
})

export const { userFetched, userReset } = userSlice.actions
export default userSlice.reducer
