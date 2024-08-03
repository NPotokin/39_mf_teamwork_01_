import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/core/App'
import { Provider } from 'react-redux'
import { store } from './state/store'
import '@/scss/nes.scss'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
