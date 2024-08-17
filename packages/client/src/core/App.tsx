import { useEffect } from 'react'

import registerServiceWorker from '@/lib/sw/registerServiceWorker'
import { ENVIRONMENT } from '@/lib/constants'
import Routes from './Routes'
import { ThemeProvider } from './contexts'

const App = () => {
  useEffect(() => {
    if (ENVIRONMENT.PRODUCTION) {
      window.addEventListener('load', registerServiceWorker)
    }

    return () => {
      if (ENVIRONMENT.PRODUCTION) {
        window.removeEventListener('load', registerServiceWorker)
      }
      delete window.APP_INITIAL_STATE
    }
  }, [])

  return (
    <>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </>
  )
}

export default App
