import { ErrorBoundary } from '@/core'
import { ServerErrorPage } from '@/pages'
import { Outlet } from 'react-router'

const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={ServerErrorPage}>
    <Outlet />
  </ErrorBoundary>
)

export default ErrorBoundaryLayout
