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
// import { Loader } from '@/components/Loader'
import { Loader } from '@/components/Loader'
import { ENVIRONMENT } from '@/lib/constants'
import Routes from './Routes'
import { ThemeProvider } from './contexts'

const App = () => {
  // const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const isAuthenticated = useIsAuth()

  useEffect(() => {
    // if (ENVIRONMENT.PRODUCTION) {
    //   window.addEventListener(
    //     'load',
    //     registerServiceWorker
    //   )
    // }

    const controller = new AbortController()
    const signal = controller.signal

    const fetchServerData = async () => {
      const urlTopics = `${__SERVER_URL__}:${__SERVER_PORT__}/api/topics`
      // const urlTopicById = `${__SERVER_URL__}:${__SERVER_PORT__}/api/topics/${3}`

      try {
        // const allTopics = await fetch(urlTopics, { signal })
        const createTopic = await fetch(
          urlTopics,
          {
            method: 'POST',
            body: JSON.stringify({
              topicName: 'Game difficult',
              description:
                'Topic about difficulty levels of the game Pumkin Pandas',
            }),
            signal,
          }
        )
        // const topicById = await fetch(urlTopicById, { signal })

        // const allTopicsData = await allTopics.json();
        // const topicByIdData = await topicById.json();
        const resp = await createTopic.json()

        // console.log(allTopicsData)
        // console.log(topicByIdData)
        console.log(resp)
      } catch (error: unknown) {
        console.error('Fetch data failed')
        console.error(error)
      } finally {
        // setLoading(false)
      }
    }

    fetchServerData()

    return () => {
      controller.abort()

      if (ENVIRONMENT.PRODUCTION) {
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
