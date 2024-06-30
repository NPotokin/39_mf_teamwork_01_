import { AxiosResponse } from 'axios'

import { isApiError } from '@/lib/utils/type-check'
import {
  IAPIError,
  IUpdatePassword,
  IUpdateUser,
  IUpdateUserResponse,
  IUserInfo,
} from '../api/model'
import UserApi from '../api/user.api'

const userApi = new UserApi()

export const updateProfile = async (data: IUpdateUser): Promise<void> => {
  const response: AxiosResponse<IUpdateUserResponse | IAPIError> =
    await userApi.updateProfile(data)
  const responseData: IUpdateUserResponse | IAPIError = response.data

  if (isApiError(responseData)) {
    throw new Error(responseData.reason)
  }

  console.log(responseData)
  //TODO: save user data to store
}

export const updatePassword = async (data: IUpdatePassword): Promise<void> => {
  const response: AxiosResponse<void | IAPIError> =
    await userApi.updatePassword(data)
  const responseData: void | IAPIError = response.data

  if (isApiError(responseData)) {
    throw new Error(responseData.reason)
  }

  console.log('Password updated')
}

export const updateAvatar = async (file: FormData): Promise<void> => {
  const response: AxiosResponse<IUserInfo | IAPIError> =
    await userApi.updateAvatar(file)
  const data: IUserInfo | IAPIError = response.data

  if (isApiError(data)) {
    throw new Error(data.reason)
  }

  console.log(response)

  //TODO: save user data to store
}
