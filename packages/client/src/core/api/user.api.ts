import { AxiosResponse } from 'axios'

import axiosDB from './api'
import {
  IAPIError,
  IUpdateUser,
  IUpdateUserResponse,
  IUpdatePassword,
  IUserInfo,
} from './model'

export default class UserApi {
  public updateProfile(
    data: IUpdateUser
  ): Promise<
    AxiosResponse<IUpdateUserResponse | IAPIError>
  > {
    return axiosDB.put<IUpdateUserResponse>(
      '/user/profile',
      data
    )
  }

  public updatePassword(
    data: IUpdatePassword
  ): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.put('/user/password', data)
  }

  public updateAvatar(
    data: FormData
  ): Promise<
    AxiosResponse<IUserInfo | IAPIError>
  > {
    return axiosDB.put(
      '/user/profile/avatar',
      data
    )
  }
}
