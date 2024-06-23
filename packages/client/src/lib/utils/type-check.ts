import {
  IAPIError,
  IUpdateUser,
  ICreateUser,
  IUpdatePassword,
} from '../../core/api/model'

export function isApiError(data: unknown): data is IAPIError {
  if (!data || typeof data !== 'object') {
    return false
  }

  return 'reason' in data
}

export function isUpdateUser(data: unknown): data is IUpdateUser {
  if (!data || typeof data !== 'object') {
    return false
  }

  return (
    'login' in data &&
    'first_name' in data &&
    'second_name' in data &&
    'display_name' in data &&
    'phone' in data &&
    'email' in data
  )
}

export function isCreateUser(data: unknown): data is ICreateUser {
  if (!data || typeof data !== 'object') {
    return false
  }

  return (
    'login' in data &&
    'first_name' in data &&
    'second_name' in data &&
    'phone' in data &&
    'email' in data
  )
}

export function isUpdatePassword(data: unknown): data is IUpdatePassword {
  if (!data || typeof data !== 'object') {
    return false
  }

  return 'oldPassword' in data && 'newPassword' in data
}
