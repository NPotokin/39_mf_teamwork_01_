import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react'
import { ConfigProvider } from 'antd'

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
  useEffect(() => {
    document.body.setAttribute(
      'data-theme',
      theme
    )
    //TODO: send newTheme to the server
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === 'light' ? 'dark' : 'light'
    )
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
