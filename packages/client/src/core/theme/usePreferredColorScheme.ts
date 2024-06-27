import { useEffect, useState } from 'react'

export const usePreferredColorScheme = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
    const documentEvent = () => {
      setTheme(mediaQueryList.matches ? 'dark' : 'light')
    }
    documentEvent()
    mediaQueryList.addEventListener('change', documentEvent)
    return () => {
      mediaQueryList.removeEventListener('change', documentEvent)
    }
  }, [])

  return theme
}
