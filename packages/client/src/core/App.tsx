import { useEffect } from 'react'

import { getUser, USER_DATA_KEY } from '@/core/services/auth.service'
import { showNotification } from '@/core/services/notification.service'
import registerServiceWorker from '@/lib/sw/registerServiceWorker'
import { useIsAuth } from '@/lib/hooks'
import { useAppDispatch } from '@/lib/hooks/redux'
import { setUser } from '@/state/user/userSlice'
// import { Loader } from '@/components/Loader'
import { ENVIRONMENT } from '@/lib/constants'
import Routes from './Routes'
import { ThemeProvider } from './contexts'

const App = () => {
  // const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const isAuthenticated = useIsAuth()

  useEffect(() => {
    if (ENVIRONMENT.PRODUCTION) {
      window.addEventListener('load', registerServiceWorker)
    }

    return () => {
      if (ENVIRONMENT.PRODUCTION) {
        window.removeEventListener('load', registerServiceWorker)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchUser = async () => {
      if (isAuthenticated) {
        const storedUser =
          typeof window !== 'undefined' ? localStorage.getItem(USER_DATA_KEY) : null

        if (storedUser) {
          dispatch(setUser(JSON.parse(storedUser)))
        } else {
          try {
            const userData = await getUser({
              signal,
            })
            dispatch(setUser(userData))
          } catch (error: unknown) {
            showNotification('error', 'Error fetching user data')
          }
        }
      }
    }

    fetchUser()

    return () => {
      controller.abort()
    }
  }, [isAuthenticated])

  // if (loading) {
  //   return <Loader />
  // }

  return (
    <>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </>
  )
}

export default App
