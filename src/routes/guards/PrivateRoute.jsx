import { Navigate } from 'react-router-dom'

import { Spinner } from '@/components/Spinner'
import useHasAccess from '@/hooks/useHasAccess'

export const PrivateRoute = ({
  children,
  requireStatuses = [],
  requireRoles = []
}) => {
  const { isFetching, isAuthenticated, hasAccess } = useHasAccess({
    requireStatuses,
    requireRoles
  })

  if (isFetching) {
    return <Spinner />
  }

  if (!isAuthenticated || !hasAccess) {
    return <Navigate to='/' replace />
  }

  return children
}
