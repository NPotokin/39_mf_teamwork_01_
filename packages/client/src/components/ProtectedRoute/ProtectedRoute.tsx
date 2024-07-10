import { RoutePath } from '@/core/Routes.enum'
import { useIsAuth } from '@/lib/hooks'
import {
  FC,
  PropsWithChildren,
  isValidElement,
} from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute: FC<PropsWithChildren> = ({
  children,
}) => {
  const isAuthenticated = useIsAuth()

  if (isAuthenticated === undefined) return null

  return isAuthenticated &&
    isValidElement(children) ? (
    children
  ) : (
    <Navigate to={RoutePath.SIGN_IN} replace />
  )
}

export default ProtectedRoute
