export interface IAPIError {
  reason: string
}

export interface ISignUpResponse {
  id: number
}

export interface IUserInfo {
  id: number
  login: string
  first_name: string
  second_name: string
  display_name: string
  avatar: string
  phone: string
  email: string
}
export interface ICreateUser
  extends Omit<
    IUserInfo,
    'avatar' | 'display_name' | 'id'
  > {
  password: string
}

export type IUpdateUser = Omit<
  IUserInfo,
  'avatar' | 'id'
>

export type IUpdateUserResponse = Omit<
  IUserInfo,
  'avatar'
>

export interface IUpdatePassword {
  oldPassword: string
  newPassword: string
}

export interface ILoginRequestData {
  login: string
  password: string
}

export interface IAPIError {
  reason: string
}
export const teamName = 'pumpkinPandas'
export const ratingFieldName =
  'pumpkinPandasScoreField'
export interface ISubmitScoreResponse {
  data: {
    userLogin: string
    pumpkinPandasScoreField: -1
  }
  pumpkinPandasScoreField: number
  userLogin: string
  ratingFieldName: typeof teamName
  teamName: typeof ratingFieldName
}

export interface IGetLeaderboardResponse {
  data: Array<{
    userLogin: string
    pumpkinPandasScoreField: number
    avatarUrl?: string
  }>
}

export interface ICurrentScoreResponse {
  leaders: Array<{
    data: {
      userLogin: string
      pumpkinPandasScoreField: number
    }
  }>
}

export interface IYandexServiceId {
  service_id: string
}
