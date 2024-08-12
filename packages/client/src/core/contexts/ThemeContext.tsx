import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react'
import { ConfigProvider } from 'antd/lib'
import axios, { AxiosError } from 'axios'
import {
  darkTheme,
  lightTheme,
} from '@/core/theme'
import { getUserDevice } from '../utils/deviceUtils'
import { useAppSelector } from '@/lib/hooks/redux'

type ThemeType = 'light' | 'dark'

type ThemeContextType = {
  theme: ThemeType
  toggleTheme: () => void
}

const themeMap = {
  light: lightTheme,
  dark: darkTheme,
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(
      'useTheme must be used within a ThemeProvider'
    )
  }
  return context
}

export const ThemeProvider: React.FC<
  PropsWithChildren
> = ({ children }) => {
  // Сначала пытаемся получить тему из localStorage, если её там нет - по умолчанию 'light'
  const themeStart =
    typeof window !== 'undefined' &&
    localStorage.getItem('theme')
      ? (localStorage.getItem(
          'theme'
        ) as ThemeType)
      : 'light'

  const [theme, setTheme] =
    useState<ThemeType>(themeStart)

  const user = useAppSelector(
    state => state.user?.data
  )
  const userId = user?.id
  useEffect(() => {
    const fetchTheme = async () => {
      if (!userId) return
      try {
        const response = await axios.get(
          `/api/themes/${userId}`
        )
        const userTheme = response.data
          .theme as ThemeType
        if (userTheme) {
          setTheme(userTheme)
          localStorage.setItem('theme', userTheme)
        }
      } catch (error) {
        console.error(
          'Failed to fetch theme from server',
          error
        )
      }
    }

    if (userId) {
      fetchTheme()
    }
  }, [userId])

  useEffect(() => {
    document.body.setAttribute(
      'data-theme',
      theme
    )
  }, [theme])

  const toggleTheme = async () => {
    const newTheme: ThemeType =
      theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (!userId) return // Если пользователь не зарегистрирован, не выполнять запрос
    const device = getUserDevice() // Используем функцию для получения устройства

    try {
      if (!userId) return
      try {
        await axios.get(`/api/themes/${userId}`)
        await axios.put(`/api/themes/${userId}`, {
          theme: newTheme,
          description: newTheme,
          device, // Отправляем устройство пользователя
        })
      } catch (error) {
        const axiosError = error as AxiosError

        if (axiosError.response?.status === 404) {
          await axios.post(
            `/api/themes/${userId}`,
            {
              theme: newTheme,
              description: newTheme,
              device, // Отправляем устройство пользователя
            }
          )
        } else {
          throw error
        }
      }
      console.log('Theme successfully updated')
    } catch (error) {
      console.error(
        'Failed to update theme on server',
        error
      )
    }
  }
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}>
      <ConfigProvider theme={themeMap[theme]}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
