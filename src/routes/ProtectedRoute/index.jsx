import RootRedirect from '@/components/RootRedirect'
import useHasAccess from '@/hooks/useHasAccess'

const ProtectedRoute = ({
  children,
  requireStatuses = [],
  requireRoles = []
}) => {
  const { hasAccess, loading } = useHasAccess({
    requireStatuses,
    requireRoles
  })

  if (loading) {
    return null // or a loader/spinner
  }

  if (!hasAccess) {
    return <RootRedirect />
  }

  return children
}

export default ProtectedRoute
