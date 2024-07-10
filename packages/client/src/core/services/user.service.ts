import { AxiosResponse } from 'axios'

import { isApiError } from '@/lib/utils/type-check'
import { showNotification } from './notification.service'
import { errorInfo } from '@/lib/utils/errorInfo'

import {
  IAPIError,
  IUpdatePassword,
  IUpdateUser,
  IUpdateUserResponse,
  IUserInfo,
} from '../api/model'
import UserApi from '../api/user.api'

const userApi = new UserApi()

export const updateProfile = async (
  data: IUpdateUser
): Promise<IUpdateUserResponse | undefined> => {
  try {
    const response: AxiosResponse<
      IUpdateUserResponse | IAPIError
    > = await userApi.updateProfile(data)
    const responseData:
      | IUpdateUserResponse
      | IAPIError = response.data

    if (isApiError(responseData)) {
      throw new Error(responseData.reason)
    }

    return responseData
  } catch (error: unknown) {
    showNotification('error', errorInfo(error))
  }
}

export const updatePassword = async (
  data: IUpdatePassword
): Promise<void> => {
  try {
    const response: AxiosResponse<void | IAPIError> =
      await userApi.updatePassword(data)
    const responseData: void | IAPIError =
      response.data

    if (isApiError(responseData)) {
      throw new Error(responseData.reason)
    }
  } catch (error: unknown) {
    showNotification('error', errorInfo(error))
  }
}

export const updateAvatar = async (
  file: FormData
): Promise<IUserInfo | undefined> => {
  try {
    const response: AxiosResponse<
      IUserInfo | IAPIError
    > = await userApi.updateAvatar(file)
    const data: IUserInfo | IAPIError =
      response.data

    if (isApiError(data)) {
      throw new Error(data.reason)
    }

    return data
  } catch (error: unknown) {
    showNotification('error', errorInfo(error))
  }
}
