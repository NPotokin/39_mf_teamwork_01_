import { useEffect, useState } from 'react'

import {
  getUser,
  USER_DATA_KEY,
} from '@/core/services/auth.service'
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

    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error('Ошибка запроса в БД')
      } finally {
        setLoading(false)
      }
    }

    fetchServerData()

    return () => {
      if (process.env.NODE_ENV === 'production') {
        window.removeEventListener(
          'load',
          registerServiceWorker
        )
      }
    }
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated) {
        const storedUser = localStorage.getItem(
          USER_DATA_KEY
        )

        if (storedUser) {
          dispatch(
            setUser(JSON.parse(storedUser))
          )
        } else {
          const userData = await getUser()
          dispatch(setUser(userData))
        }
      }
    }

    fetchUser()
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
