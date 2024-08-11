import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react'
import { ConfigProvider } from 'antd'
import axios, { AxiosError } from 'axios'
import {
  darkTheme,
  lightTheme,
} from '@/core/theme'

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
  const [theme, setTheme] =
    useState<ThemeType>('light')

  const userData =
    localStorage.getItem('userData')
  const userId = userData
    ? JSON.parse(userData).id
    : null

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(
          `/api/themes/${userId}`
        )
        const userTheme = response.data
          .theme as ThemeType
        setTheme(userTheme)
        localStorage.setItem('theme', userTheme)
      } catch (error) {
        console.error(
          'Failed to fetch theme from server',
          error
        )
      }
    }

    fetchTheme()
  }, [])

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

    try {
      try {
        await axios.get(`/api/themes/${userId}`)
        await axios.put(`/api/themes/${userId}`, {
          theme: newTheme,
          description: newTheme,
        })
      } catch (error) {
        const axiosError = error as AxiosError

        if (axiosError.response?.status === 404) {
          await axios.post(
            `/api/themes/${userId}`,
            {
              theme: newTheme,
              description: newTheme,
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
