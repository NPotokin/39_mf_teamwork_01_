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
  ): Promise<AxiosResponse<IUpdateUserResponse | IAPIError>> {
    return axiosDB.post<IUpdateUserResponse>('/user/profile', data)
  }

  public updatePassword(
    data: IUpdatePassword
  ): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.post('/user/password', data)
  }

  public updateAvatar(
    data: FormData
  ): Promise<AxiosResponse<IUserInfo | IAPIError>> {
    return axiosDB.post('/profile/avatar')
  }
}
