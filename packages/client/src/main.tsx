import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/core/App'
import './index.scss'
import '@/scss/nes.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
