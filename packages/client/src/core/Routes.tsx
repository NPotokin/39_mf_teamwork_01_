import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home } from '@/pages/Home'
import { Profile } from '@/pages/Profile'
import { Game } from '@/pages/Game'
import { Login } from '@/pages/Login'
import { Registration } from '@/pages/Registration'
import { LeaderBoard } from '@/pages/LeaderBoard'
import { Forum } from '@/pages/Forum'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ServerErrorPage } from '@/pages/ServerErrorPage'
import { RoutePath } from './Routes.enum'

const routes = [
  {
    path: RoutePath.HOME,
    element: <Home />,
  },
  {
    path: RoutePath.GAME,
    element: <Game />,
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
    element: <LeaderBoard />,
  },
  {
    path: RoutePath.FORUM,
    element: <Forum />,
  },
  {
    path: RoutePath.PROFILE,
    element: <Profile />,
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
