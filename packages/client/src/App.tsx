import { useEffect, useState } from 'react'
import './App.css'
import { login } from './core/services/auth.service'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()

    const dataStub = {
      login: 'Grosno',
      password: '123123123Q',
    }
    login(dataStub)
      .then((logged: boolean) => setAuthenticated(logged))
      .catch(error => console.log(error))
  }, [])
  return (
    <div className="App">
      {isAuthenticated
        ? 'Пользователь авторизован.'
        : 'Пользователь не авторизован'}
    </div>
  )
}

export default App
