import { AxiosResponse } from 'axios'
import AuthApi from '../api/auth.api'
import {
  IAPIError,
  ICreateUser,
  ILoginRequestData,
  IUserInfo,
} from '../api/model'
import { isApiError } from '@/lib/utils/type-check'

const authApi = new AuthApi()

export const getUser = async (): Promise<IUserInfo> => {
  const userResponse: AxiosResponse<IUserInfo | IAPIError> =
    await authApi.user()
  const data = userResponse.data

  if (isApiError(data)) {
    throw new Error(data.reason)
  }

  return data
}

export const login = async (data: ILoginRequestData): Promise<boolean> => {
  try {
    await authApi.login(data)
    const user = await getUser()
    console.log(user)
    return true
  } catch (error: unknown) {
    console.error(error)
  }
  return false
}

export const createUser = async (data: ICreateUser): Promise<void> => {
  const response = await authApi.create(data)
  const responseData = response.data

  if (isApiError(responseData)) {
    console.error(responseData.reason)
  }

  if (responseData.id) {
    // получить и сохранить данные пользователя в store
  }
}

export const logout = async (): Promise<boolean> => {
  try {
    await authApi.logout()
    return true
  } catch (error) {
    console.error(error)
  }

  return false
}
