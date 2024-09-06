import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'

import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { createFetchRequest, createUrl } from '@/entry-server.utils'
import { routes } from '@/core/Routes'
import { matchRoutes } from 'react-router'
import { fetchUserThunk } from '@/state/user/userThunk'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '@/state/store'
import { ThemeProvider } from '@/core/contexts'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const url = createUrl(req)

  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const store = configureStore({ reducer })

  const cookies = req.headers.cookie || ''
  await store.dispatch(fetchUserThunk(cookies))

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOMServer.renderToString(
      <Provider store={store}>
        <ThemeProvider>
          <StaticRouterProvider router={router} context={context} />
        </ThemeProvider>
      </Provider>
    ),
    initialState: store.getState(),
    cookie: cookies,
  }
}
