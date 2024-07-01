import { useEffect } from 'react'

import Routes from './Routes'
import { ThemeProvider } from './contexts'

const App = () => {
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
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </>
    )
  }
}

export default App
