import { IUserInfo } from '@/core/api/model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = {
  loading: boolean
  data: IUserInfo
}

const initialState: UserState = {
  loading: false,
  data: {} as IUserInfo,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching: state => {
      state.loading = true
    },
    userFetched: (state, action: PayloadAction<IUserInfo>) => {
      state.data = action.payload
    },
  },
})

export const { userFetching, userFetched } = userSlice.actions
export default userSlice.reducer
