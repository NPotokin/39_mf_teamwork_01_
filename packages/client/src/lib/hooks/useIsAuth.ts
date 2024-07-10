import { AUTH_KEY } from '@/core/services/auth.service'
import { useEffect, useState } from 'react'

export const useIsAuth = ():
  | boolean
  | undefined => {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>()

  useEffect(() => {
    const isAuthed =
      localStorage.getItem(AUTH_KEY)

    if (!isAuthed) {
      setIsAuthenticated(false)
      return
    }

    setIsAuthenticated(JSON.parse(isAuthed))
  }, [])

  return isAuthenticated
}
