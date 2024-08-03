import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { RoutePath } from './Routes.enum'
import {
  ErrorBoundaryLayout,
  ProtectedRoute,
  YandexOAuthRedirect,
} from '@/components'
import {
  Home,
  Game,
  Login,
  Registration,
  LeaderBoard,
  Forum,
  Profile,
  NotFoundPage,
  ServerErrorPage,
} from '@/pages'
import { ForumProvider } from '@/core/contexts'

const routes: RouteObject[] = [
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: RoutePath.HOME,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.GAME,
        element: (
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.SIGN_IN,
        element: <Login />,
      },
      {
        path: RoutePath.SIGN_UP,
        element: <Registration />,
      },
      {
        path: RoutePath.LEADER_BOARD,
        element: (
          <ProtectedRoute>
            <LeaderBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.FORUM,
        element: (
          <ProtectedRoute>
            <ForumProvider>
              <Forum />
            </ForumProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.PROFILE,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.PAGE_NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: RoutePath.SERVER_ERROR,
        element: <ServerErrorPage />,
      },
      {
        path: RoutePath.YANDEX_OAUTH_REDIRECT,
        element: <YandexOAuthRedirect />,
      },
      {
        path: RoutePath.ERROR,
        element: <NotFoundPage />,
      },
    ],
  },
]

const router = createMemoryRouter(routes)

const Routes = () => (
  <RouterProvider router={router} />
)

export default Routes
