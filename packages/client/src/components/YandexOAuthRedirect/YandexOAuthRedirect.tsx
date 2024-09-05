import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getAccessToken, getUser } from '@/core/services/auth.service'
import { useAppDispatch } from '@/lib/hooks/redux'

import { showNotification } from '@/core/services/notification.service'
import { errorInfo } from '@/lib/utils/errorInfo'
import { RoutePath } from '@/core/Routes.enum'
import { setUser } from '@/state/user/userSlice'

const YandexOAuthRedirect = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const REDIRECT_URI = __YANDEX_AUTH_URL__

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    const handleAuthCode = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const authCode = urlParams.get('code')

      if (authCode) {
        try {
          await getAccessToken(authCode, REDIRECT_URI, { signal })
          const userData = await getUser({
            signal,
          })
          dispatch(setUser(userData))
          navigate(RoutePath.HOME)
        } catch (error: unknown) {
          showNotification('error', errorInfo(error))
          navigate(RoutePath.SIGN_IN)
        }
      } else {
        navigate(RoutePath.SIGN_IN)
      }

      return () => {
        controller.abort()
      }
    }

    handleAuthCode()
  }, [])
  return null
}

export default YandexOAuthRedirect
