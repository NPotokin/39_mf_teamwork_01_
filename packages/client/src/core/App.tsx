import { useEffect } from 'react'

import './App.css'
import Routes from './Routes'
import { ConfigProvider } from 'antd'
import themeConfig from './themeConfig'

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
        <ConfigProvider theme={themeConfig}>
          <Routes />
        </ConfigProvider>
      </>
    )
  }
}

export default App
