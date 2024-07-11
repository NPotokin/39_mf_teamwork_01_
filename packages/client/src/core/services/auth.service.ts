import AuthApi from '../api/auth.api'
import {
  ICreateUser,
  ILoginRequestData,
  IUserInfo,
} from '../api/model'
import { isApiError } from '@/lib/utils/type-check'
import { showNotification } from './notification.service'
import { errorInfo } from '@/lib/utils/errorInfo'

export const AUTH_KEY = 'isAuthed'
export const USER_DATA_KEY = 'userData'

const authApi = new AuthApi()

export const getUser =
  async (): Promise<IUserInfo> => {
    const userResponse = await authApi.user()

    if (isApiError(userResponse.data)) {
      throw new Error(userResponse.data.reason)
    }
    return userResponse.data
  }

export const signin = async (
  data: ILoginRequestData
): Promise<IUserInfo | undefined> => {
  try {
    await authApi.login(data)
    const user = await getUser()
    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify(true)
    )
    localStorage.setItem(
      USER_DATA_KEY,
      JSON.stringify(user)
    )

    return user
  } catch (error: unknown) {
    showNotification('error', errorInfo(error))
  }
}

export const signup = async (
  data: ICreateUser
): Promise<IUserInfo | undefined> => {
  try {
    await authApi.create(data)
    const user = await getUser()
    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify(true)
    )
    localStorage.setItem(
      USER_DATA_KEY,
      JSON.stringify(user)
    )

    return user
  } catch (error) {
    showNotification('error', errorInfo(error))
  }
}

export const logout =
  async (): Promise<boolean> => {
    try {
      await authApi.logout()
      localStorage.clear()
      return true
    } catch (error) {
      showNotification('error', errorInfo(error))
      return false
    }
  }
