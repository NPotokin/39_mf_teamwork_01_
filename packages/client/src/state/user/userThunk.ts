import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from '@/core/services/auth.service'
import { IUserInfo } from '@/core/api/model'

export const fetchUserThunk = createAsyncThunk<
  IUserInfo,
  string | undefined,
  { rejectValue: string }
>(
  'user/fetchUserThunk',
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
