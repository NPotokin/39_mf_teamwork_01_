import { AUTH_KEY } from '../../core/services/auth.service'
import { useEffect, useState } from 'react'

export const useIsAuth = ():
  | boolean
  | undefined => {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>()

  useEffect(() => {
    const isAuthed =
      typeof window !== 'undefined'
        ? localStorage.getItem(AUTH_KEY)
        : null

    if (!isAuthed) {
      setIsAuthenticated(false)
      return
    }

    setIsAuthenticated(JSON.parse(isAuthed))
  }, [])

  return isAuthenticated
}
