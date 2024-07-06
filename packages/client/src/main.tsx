import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/core/App'
import registerServiceWorker from '@/lib/sw/registerServiceWorker'
import '@/scss/nes.scss'

window.addEventListener('load', registerServiceWorker)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
