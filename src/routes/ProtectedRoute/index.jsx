import { Navigate } from 'react-router-dom'

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
    return null
  }

  if (!isAuthenticated || !hasAccess) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
