import { RoutePath } from '@/core/Routes.enum'
import { useIsAuth } from '@/lib/hooks'
import { FC, ReactNode, isValidElement } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuthenticated = useIsAuth()

  return isAuthenticated && isValidElement(children) ? (
    children
  ) : (
    <Navigate to={RoutePath.SIGN_IN} replace />
  )
}

export default ProtectedRoute
