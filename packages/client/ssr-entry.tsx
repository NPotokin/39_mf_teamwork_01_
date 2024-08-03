import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'

// import App from '@/core/App'
// import { store } from '@/state/store'
import '@/index.scss'
import '@/scss/nes.scss'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '@/state/user/userSlice'
// import { fetchUser } from '@/state/user/userThunk'

import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { createFetchRequest } from '@/entry-server.utils'
import { routes } from '@/core/Routes'

export const render = async (
  req: ExpressRequest
) => {
  // 1.
  const { query, dataRoutes } =
    createStaticHandler(routes)
  // 2.
  const fetchRequest = createFetchRequest(req)
  // 3.
  const context = await query(fetchRequest)

  // 4.
  if (context instanceof Response) {
    throw context
  }

  // 5.
  const store = configureStore({
    reducer,
  })

  // 6.
  const router = createStaticRouter(
    dataRoutes,
    context
  )

  return {
    html: ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouterProvider
          router={router}
          context={context}
        />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
