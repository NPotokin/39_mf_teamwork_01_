import axios from 'axios'
import { isApiError } from './type-check'

export const erroInfo = (error: unknown): string => {
  const unknownError = 'Неизвестная ошибка'

  if (
    axios.isAxiosError(error) &&
    error.response &&
    isApiError(error.response.data)
  ) {
    const errResponse = error.response
    return errResponse.data.reason
  }

  if (error instanceof Error) {
    return error.message
  }

  return unknownError
}
