import {
  IUpdateUserResponse,
  IUserInfo,
} from '@/core/api/model'
// import { USER_DATA_KEY } from '@/core/services/auth.service'
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit'
import { fetchUser } from './userThunk'

export type UserState = {
  data: IUserInfo | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<IUserInfo>
    ) => {
      state.data = action.payload
    },
    updateUser: (
      state,
      action: PayloadAction<IUpdateUserResponse>
    ) => {
      if (state.data) {
        state.data = {
          ...state.data,
          ...action.payload,
        }
      }
    },
    updateUserAvatar: (
      state,
      action: PayloadAction<string>
    ) => {
      if (state.data) {
        state.data.avatar = action.payload
      }
    },
    resetUser: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchUser.fulfilled,
        (
          state,
          action: PayloadAction<IUserInfo>
        ) => {
          state.data = action.payload
          state.loading = false
        }
      )
      .addCase(
        fetchUser.rejected,
        (state, action) => {
          state.loading = false
          state.error = action.payload as string
        }
      )
  },
})

export const {
  setUser,
  resetUser,
  updateUser,
  updateUserAvatar,
} = userSlice.actions
export default userSlice.reducer
