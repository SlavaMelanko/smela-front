import { Navigate } from 'react-router-dom'

import Spinner from '@/components/Spinner'
import useHasAccess from '@/hooks/useHasAccess'

const ProtectedRoute = ({
  children,
  requireStatuses = [],
  requireRoles = []
}) => {
  const { isPending, isAuthenticated, hasAccess } = useHasAccess({
    requireStatuses,
    requireRoles
  })

  if (isPending) {
    return <Spinner centered />
  }

  if (!isAuthenticated || !hasAccess) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
