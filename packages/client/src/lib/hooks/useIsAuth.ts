import { empty } from '../utils/empty'
import { useAppDispatch, useAppSelector } from './redux'
import { getUser } from '@/core/services/auth.service'
import { setUser } from '@/state/user/userSlice'
import { useEffect, useState } from 'react'

export const useIsAuth = (): boolean | undefined => {
  const [authed, setAuthed] = useState<boolean>()
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const recieveUser = async () => {
      try {
        const user = await getUser()
        dispatch(setUser(user))
        setAuthed(true)
      } catch (error) {
        setAuthed(false)
      }
    }

    if (empty(user)) {
      recieveUser()
    } else {
      setAuthed(true)
    }
  }, [])

  return authed
}
