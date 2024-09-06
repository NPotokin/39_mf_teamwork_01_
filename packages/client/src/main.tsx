import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/core/App'
import { ThemeProvider } from '@/core/contexts'
import { Provider } from 'react-redux'
import { store } from './state/store'
import '@/scss/nes.scss'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
