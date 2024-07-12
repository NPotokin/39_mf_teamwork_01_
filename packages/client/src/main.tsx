import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/core/App'
import { Provider } from 'react-redux'
import { store } from './state/store'
import registerServiceWorker from '@/lib/sw/registerServiceWorker'
import './index.scss'
import '@/scss/nes.scss'

window.addEventListener(
  'load',
  registerServiceWorker
)

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
