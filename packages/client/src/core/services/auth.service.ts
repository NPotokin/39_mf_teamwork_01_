import axios, { AxiosResponse } from 'axios'
import AuthApi from '../api/auth.api'
import {
  IAPIError,
  ICreateUser,
  ILoginRequestData,
  ISignUpResponse,
  IUserInfo,
} from '../api/model'
import { isApiError } from '@/lib/utils/type-check'
import { showNotification } from './notification.service'

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
    console.error(error)
    if (axios.isAxiosError(error) && isApiError(error.response?.data)) {
      const message = error.response.data.reason
      showNotification('error', message)
    }
  }
}

export const signup = async (data: ICreateUser): Promise<void> => {
  const response: AxiosResponse<ISignUpResponse | IAPIError> =
    await authApi.create(data)
  const responseData: ISignUpResponse = response.data

  if (isApiError(responseData)) {
    throw new Error(responseData.reason)
  }

  if (responseData.id) {
    await getUser()
  }
}

export const logout = async (): Promise<void> => {
  await authApi.logout()
}
