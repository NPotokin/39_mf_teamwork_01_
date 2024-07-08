import AuthApi from '../api/auth.api'
import { ICreateUser, ILoginRequestData, IUserInfo } from '../api/model'
import { isApiError } from '@/lib/utils/type-check'
import { showNotification } from './notification.service'
import { erroInfo } from '@/lib/utils/errorInfo'

const authApi = new AuthApi()

export const getUser = async (): Promise<IUserInfo> => {
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

    return user
  } catch (error: unknown) {
    showNotification('error', erroInfo(error))
  }
}

export const signup = async (
  data: ICreateUser
): Promise<IUserInfo | undefined> => {
  try {
    await authApi.create(data)
    const user = await getUser()

    return user
  } catch (error) {
    showNotification('error', erroInfo(error))
  }
}

export const logout = async (): Promise<boolean> => {
  try {
    await authApi.logout()
    return true
  } catch (error) {
    showNotification('error', erroInfo(error))
    return false
  }
}
