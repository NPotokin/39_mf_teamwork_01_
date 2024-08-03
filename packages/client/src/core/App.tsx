import { useEffect, useState } from 'react'

import {
  getUser,
  USER_DATA_KEY,
} from '@/core/services/auth.service'
import { showNotification } from '@/core/services/notification.service'
import registerServiceWorker from '@/lib/sw/registerServiceWorker'
import { useIsAuth } from '@/lib/hooks'
import { useAppDispatch } from '@/lib/hooks/redux'
import { setUser } from '@/state/user/userSlice'
import { Loader } from '@/components/Loader'
import Routes from './Routes'
import { ThemeProvider } from './contexts'

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const isAuthenticated = useIsAuth()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      window.addEventListener(
        'load',
        registerServiceWorker
      )
    }

    const controller = new AbortController()
    const signal = controller.signal

    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`

      try {
        const response = await fetch(url, {
          signal,
        })
        const data = await response.json()
        console.log(data)
      } catch (error: unknown) {
        if (
          (error as Error).name === 'AbortError'
        ) {
          console.log('Request aborted')
        } else {
          console.error('Fetch data failed')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchServerData()

    return () => {
      controller.abort()

      if (process.env.NODE_ENV === 'production') {
        window.removeEventListener(
          'load',
          registerServiceWorker
        )
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchUser = async () => {
      if (isAuthenticated) {
        const storedUser =
          typeof window !== 'undefined'
            ? localStorage.getItem(USER_DATA_KEY)
            : null

        if (storedUser) {
          dispatch(
            setUser(JSON.parse(storedUser))
          )
        } else {
          try {
            const userData = await getUser({
              signal,
            })
            dispatch(setUser(userData))
          } catch (error: unknown) {
            showNotification(
              'error',
              'Error fetching user data'
            )
          }
        }
      }
    }

    fetchUser()

    return () => {
      controller.abort()
    }
  }, [isAuthenticated])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </>
  )
}

export default App
