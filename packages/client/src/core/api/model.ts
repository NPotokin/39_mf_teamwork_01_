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
  extends Omit<IUserInfo, 'avatar' | 'display_name' | 'id'> {
  password: string
}

export interface IUpdateUser extends Omit<IUserInfo, 'avatar' | 'id'> {
  password: string
}

export type IUpdateUserResponse = Omit<IUserInfo, 'avatar'>

export interface IUpdatePassword {
  oldPassword: string
  newPassword: string
}

export interface ILoginRequestData {
  login: string
  password: string
}
