import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'

import App from '@/core/App'
import { store } from '@/state/store'
import '@/scss/nes.scss'

export const render = () =>
  ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
