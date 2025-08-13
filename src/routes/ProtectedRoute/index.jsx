import RootRedirect from '@/components/RootRedirect'
import useHasAccess from '@/hooks/useHasAccess'

const ProtectedRoute = ({
  children,
  requireStatuses = [],
  requireRoles = []
}) => {
  const { hasAccess, isPending } = useHasAccess({
    requireStatuses,
    requireRoles
  })

  if (isPending) {
    return null // or a loader/spinner
  }

  if (!hasAccess) {
    return <RootRedirect />
  }

  return children
}

export default ProtectedRoute
