import { useEffect } from 'react'
import { ConfigProvider } from 'antd'

import Routes from './Routes'
import { usePreferredColorScheme } from './theme/usePreferredColorScheme'
import { darkTheme, lightTheme } from './theme'
import './App.css'

const App = () => {
  const preferredColorScheme = usePreferredColorScheme()
  const theme = preferredColorScheme === 'dark' ? darkTheme : lightTheme

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error('Ошибка запроса в БД')
      }
    }

    fetchServerData()
  }, [])

  {
    return (
      <>
        <ConfigProvider theme={theme}>
          <Routes />
        </ConfigProvider>
      </>
    )
  }
}

export default App
