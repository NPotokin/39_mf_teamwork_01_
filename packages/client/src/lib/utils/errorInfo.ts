import axios from 'axios'
import { isApiError } from './type-check'

export const erroInfo = (error: unknown): string => {
  if (axios.isAxiosError(error) && isApiError(error.response?.data)) {
    return error.response.data.reason
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Неизвестная ошибка'
}
