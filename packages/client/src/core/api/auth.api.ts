import {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import {
  IAPIError,
  ICreateUser,
  ILoginRequestData,
  ISignUpResponse,
  IUserInfo,
  IYandexServiceId,
} from './model'
import axiosDB from './api'

export default class AuthApi {
  public create(
    data: ICreateUser
  ): Promise<
    AxiosResponse<ISignUpResponse | IAPIError>
  > {
    return axiosDB.post<ISignUpResponse>(
      '/auth/signup',
      data
    )
  }

  public login(
    data: ILoginRequestData
  ): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.post('/auth/signin', data)
  }

  public user(
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<IUserInfo | IAPIError>
  > {
    return axiosDB.get('/auth/user', {
      ...options,
    })
  }

  public logout(): Promise<
    AxiosResponse<void | IAPIError>
  > {
    return axiosDB.post('/auth/logout')
  }

  public getAccessToken(
    authCode: string,
    redirectUri: string
  ): Promise<AxiosResponse<void | IAPIError>> {
    return axiosDB.post('/oauth/yandex', {
      code: authCode,
      redirect_uri: redirectUri,
    })
  }

  public getServiceId(
    redirectUri: string
  ): Promise<
    AxiosResponse<IYandexServiceId | IAPIError>
  > {
    return axiosDB.get(
      '/oauth/yandex/service-id',
      {
        params: {
          redirect_uri: redirectUri,
        },
      }
    )
  }
}
