import { AxiosRequestConfig } from 'axios'

import AuthApi from '../api/auth.api'
import { ICreateUser, ILoginRequestData, IUserInfo, IYandexServiceId } from '../api/model'
import { isApiError } from '@/lib/utils/type-check'
import { showNotification } from './notification.service'
import { errorInfo } from '@/lib/utils/errorInfo'

export const AUTH_KEY = 'isAuthed'
export const USER_DATA_KEY = 'userData'

const authApi = new AuthApi()

export const getUser = async (options: AxiosRequestConfig = {}): Promise<IUserInfo> => {
  try {
    const userResponse = await authApi.user(options)
    if (isApiError(userResponse.data)) {
      throw new Error(userResponse.data.reason)
    }
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userResponse.data))
    return userResponse.data
  } catch (error: unknown) {
    handleError(error)
    throw error
  }
}

export const signin = async (data: ILoginRequestData): Promise<IUserInfo | undefined> => {
  try {
    await authApi.login(data)
    const user = await getUser()
    localStorage.setItem(AUTH_KEY, JSON.stringify(true))
    return user
  } catch (error: unknown) {
    showNotification('error', errorInfo(error))
  }
}

export const signup = async (data: ICreateUser): Promise<IUserInfo | undefined> => {
  try {
    await authApi.create(data)
    const user = await getUser()
    localStorage.setItem(AUTH_KEY, JSON.stringify(true))
    return user
  } catch (error: unknown) {
    showNotification('error', errorInfo(error))
  }
}

export const logout = async (): Promise<boolean> => {
  try {
    await authApi.logout()
    localStorage.clear()
    return true
  } catch (error) {
    showNotification('error', errorInfo(error))
    return false
  }
}

export const getAccessToken = async (
  authCode: string,
  redirectUri: string,
  options: AxiosRequestConfig = {}
): Promise<void> => {
  try {
    await authApi.getAccessToken(authCode, redirectUri, options)
    localStorage.setItem(AUTH_KEY, JSON.stringify(true))
  } catch (error: unknown) {
    showNotification('error', errorInfo(error))
  }
}

export const getServiceId = async (
  redirectUri: string,
  options: AxiosRequestConfig = {}
): Promise<string | undefined> => {
  try {
    const response = await authApi.getServiceId(redirectUri, options)
    return (response.data as IYandexServiceId)?.service_id
  } catch (error: unknown) {
    handleError(error)
  }
}

const handleError = (error: unknown) => {
  if ((error as Error).name === 'AbortError') {
    console.log('Request aborted')
  } else if ((error as Error).name === 'CanceledError') {
    console.log('Request was canceled')
  } else {
    showNotification('error', errorInfo(error))
  }
}
