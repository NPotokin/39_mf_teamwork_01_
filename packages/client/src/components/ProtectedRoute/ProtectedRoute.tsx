import { RoutePath } from '@/core/Routes.enum'
import { useIsAuth } from '@/lib/hooks'
import { FC, PropsWithChildren, isValidElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = useIsAuth()
  const location = useLocation()

  return isAuthenticated && isValidElement(children) ? (
    children
  ) : (
    <Navigate to={RoutePath.SIGN_IN} state={{ from: location }} replace />
  )
}

export default ProtectedRoute
