import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from '@/core/services/auth.service'
import { IUserInfo } from '@/core/api/model'

export const fetchUser = createAsyncThunk<
  IUserInfo,
  string | undefined, // Accept cookies or undefined
  { rejectValue: string }
>(
  'user/fetchUser',
  async (cookies, { rejectWithValue }) => {
    try {
      const userData = await getUser({
        headers: { Cookie: cookies },
      })
      return userData
    } catch (error) {
      return rejectWithValue(
        'Failed to fetch user data'
      )
    }
  }
)
