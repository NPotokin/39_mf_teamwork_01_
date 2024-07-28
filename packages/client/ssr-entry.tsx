import ReactDOMServer from 'react-dom/server'

import App from './src/core/App'
import '@/index.scss'
import '@/scss/nes.scss'

export const render = () =>
  ReactDOMServer.renderToString(<App />)
