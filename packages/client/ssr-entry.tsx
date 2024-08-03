import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'

import App from '@/core/App'
import { store } from '@/state/store'
import '@/index.scss'
import '@/scss/nes.scss'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '@/state/user/userSlice'
import { fetchUser } from '@/state/user/userThunk'

// export const render = () =>
//   ReactDOMServer.renderToString(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )

export const render = async () => {
  const store = configureStore({
    reducer,
  })

  await store.dispatch(fetchUser())

  return {
    html: ReactDOMServer.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
