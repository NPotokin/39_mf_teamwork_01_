import { AxiosResponse } from 'axios'
import AuthApi from '../api/auth.api'
import {
  IAPIError,
  ICreateUser,
  ILoginRequestData,
  ISignUpResponse,
  IUserInfo,
} from '../api/model'
import { isApiError } from '@/lib/utils/type-check'

const authApi = new AuthApi()

export const getUser = async (): Promise<void> => {
  const userResponse: AxiosResponse<IUserInfo | IAPIError> =
    await authApi.user()
  const data: IUserInfo | IAPIError = userResponse.data

  if (isApiError(data)) {
    throw new Error(data.reason)
  }

  // TODO сохранить данные пользователя в store
}

export const login = async (data: ILoginRequestData): Promise<void> => {
  try {
    await authApi.login(data)
    await getUser()
  } catch (error: unknown) {
    console.error(error)
  }
}

export const createUser = async (data: ICreateUser): Promise<void> => {
  const response: AxiosResponse<ISignUpResponse> = await authApi.create(data)
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
