import { FC } from 'react'
import { Navigate, Route, RouteProps } from 'react-router-dom'

const ProtectedRoute: FC<RouteProps> = props => {
  const isAuthenticated = false

  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default ProtectedRoute
