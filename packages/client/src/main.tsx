import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/core/App'
import { Provider } from 'react-redux'
import { store } from './state/store'
import './index.scss'
import '@/scss/nes.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
