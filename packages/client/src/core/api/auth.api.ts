import { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  IAPIError,
  ICreateUser,
  ILoginRequestData,
  ISignUpResponse,
  IUserInfo,
  IYandexServiceId,
} from './model'
import { axiosDB } from './api'
import { YANDEX_API_URL } from '@/lib/constants'

export default class AuthApi {
  public create(data: ICreateUser): Promise<AxiosResponse<ISignUpResponse | IAPIError>> {
    return axiosDB.post<ISignUpResponse>(`${YANDEX_API_URL}/auth/signup`, data)
  }

  public login(data: ILoginRequestData): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.post(`${YANDEX_API_URL}/auth/signin`, data)
  }

  public user(options?: AxiosRequestConfig): Promise<AxiosResponse<IUserInfo | IAPIError>> {
    return axiosDB.get(`${YANDEX_API_URL}/auth/user`, {
      ...options,
    })
  }

  public logout(): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.post(`${YANDEX_API_URL}/auth/logout`)
  }

  public getAccessToken(
    authCode: string,
    redirectUri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.post(
      `${YANDEX_API_URL}/oauth/yandex`,
      {
        code: authCode,
        redirect_uri: redirectUri,
      },
      options
    )
  }

  public getServiceId(
    redirectUri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<IYandexServiceId | IAPIError>> {
    return axiosDB.get(`${YANDEX_API_URL}/oauth/yandex/service-id`, {
      params: {
        redirect_uri: redirectUri,
      },
      ...options,
    })
  }
}
