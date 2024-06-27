import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { RoutePath } from './Routes.enum'
import { ErrorBoundaryLayout, ProtectedRoute } from '@/components'
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
import { ForumProvider } from '@/context/ForumContext'

const routes: RouteObject[] = [
  {
    path: RoutePath.HOME,
    element: <Home />,
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
    path: RoutePath.ERROR,
    element: <NotFoundPage />,
  },
]

const router = createBrowserRouter(routes)

const Routes = () => <RouterProvider router={router} />

export default Routes
