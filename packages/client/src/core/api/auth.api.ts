import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  IAPIError,
  ICreateUser,
  ILoginRequestData,
  ISignUpResponse,
  IUserInfo,
  IYandexServiceId,
} from './model'
import { axiosDB, axiosProxy } from './api'

export default class AuthApi {
  public create(data: ICreateUser): Promise<AxiosResponse<ISignUpResponse | IAPIError>> {
    return axiosDB.post<ISignUpResponse>('/auth/signup', data)
  }

  public login(data: ILoginRequestData): Promise<AxiosResponse<void | IAPIError>> {
    // return axios.post('http://localhost:3001/yandex-api/auth/signin', data)
    return axiosProxy.post('/yandex-api/auth/signin', data)
  }

  public user(options?: AxiosRequestConfig): Promise<AxiosResponse<IUserInfo | IAPIError>> {
    // return axios.get('http://localhost:3001/yandex-api/auth/user', { ...options })
    return axiosProxy.get('/yandex-api/auth/user', {
      ...options,
    })
  }

  public logout(): Promise<AxiosResponse<void | IAPIError>> {
    // return axios.post('http://localhost:3001/yandex-api/auth/logout')
    return axiosProxy.post('/yandex-api/auth/logout')
  }

  public getAccessToken(
    authCode: string,
    redirectUri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.post(
      '/oauth/yandex',
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
    return axiosDB.get('/oauth/yandex/service-id', {
      params: {
        redirect_uri: redirectUri,
      },
      ...options,
    })
  }
}
