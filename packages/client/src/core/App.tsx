import { useEffect } from 'react'

import './App.css'
import Routes from './Routes'
import { ConfigProvider } from 'antd'

const App = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  {
    return (
      <>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#F77704',
              borderRadius: 2,
              fontFamily: 'Press Start 2P',
            },
          }}>
          <Routes />
        </ConfigProvider>
      </>
    )
  }
}

export default App
