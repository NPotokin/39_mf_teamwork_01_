import { AxiosResponse } from 'axios'

import { axiosDB } from './api'
import { IAPIError, IUpdateUser, IUpdateUserResponse, IUpdatePassword, IUserInfo } from './model'
import { YANDEX_API_URL } from '@/lib/constants'

export default class UserApi {
  public updateProfile(data: IUpdateUser): Promise<AxiosResponse<IUpdateUserResponse | IAPIError>> {
    return axiosDB.put<IUpdateUserResponse>(`${YANDEX_API_URL}/user/profile`, data)
  }

  public updatePassword(data: IUpdatePassword): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.put(`${YANDEX_API_URL}/user/password`, data)
  }

  public updateAvatar(data: FormData): Promise<AxiosResponse<IUserInfo | IAPIError>> {
    return axiosDB.put(`${YANDEX_API_URL}/user/profile/avatar`, data)
  }
}
