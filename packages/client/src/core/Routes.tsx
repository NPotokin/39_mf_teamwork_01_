import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home } from '@/pages/Home'
import { Profile } from '@/pages/Profile'

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]

const router = createBrowserRouter(routes)

const Routes = () => <RouterProvider router={router} />

export default Routes
