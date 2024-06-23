import { AxiosResponse } from 'axios'
import {
  IAPIError,
  ICreateUser,
  ILoginRequestData,
  ISignUpResponse,
  IUserInfo,
} from './model'
import axiosDB from './api'

export default class AuthApi {
  public create(data: ICreateUser): Promise<AxiosResponse<ISignUpResponse>> {
    return axiosDB.post<ISignUpResponse>('/auth/signup', data)
  }

  public login(
    data: ILoginRequestData
  ): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.post('/auth/signin', data)
  }

  public user(): Promise<AxiosResponse<IUserInfo | IAPIError>> {
    return axiosDB.get('/auth/user')
  }

  public logout(): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.post('/auth/logout')
  }
}
