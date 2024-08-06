import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from '@/core/services/auth.service'
import { IUserInfo } from '@/core/api/model'

export const fetchUser = createAsyncThunk<
  IUserInfo,
  void,
  { rejectValue: string }
>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const userData = await getUser()
      return userData
    } catch (error) {
      return rejectWithValue(
        'Failed to fetch user data'
      )
    }
  }
)
