import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/state/store'

import App from '@/core/App'
import '@/index.scss'
import '@/scss/nes.scss'

export const render = () =>
  ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
