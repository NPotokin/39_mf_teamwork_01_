import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'

// import App from '@/core/App'
import { store } from '@/state/store'
import '@/index.scss'
import '@/scss/nes.scss'
// import { configureStore } from '@reduxjs/toolkit'
// import reducer from '@/state/user/userSlice'
// import { fetchUser } from '@/state/user/userThunk'

import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import {
  createFetchRequest,
  createUrl,
} from '@/entry-server.utils'
import { routes } from '@/core/Routes'
import { matchRoutes } from 'react-router'
import { fetchUser } from '@/state/user/userThunk'

export const render = async (
  req: ExpressRequest
) => {
  const { query, dataRoutes } =
    createStaticHandler(routes)

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

  // const [{route: { fetchData }}] = foundRoutes

  // try {
  //   await fetchData({
  //     dispatch: store.dispatch,
  //     state: store.getState(),
  //   })
  // } catch (e) {
  //   console.log('Инициализация страницы произошла с ошибкой', e)
  // }

  await store.dispatch(fetchUser())

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
