import { useCurrentUser } from '@/hooks/useAuth'

const useHasAccess = ({ requireStatuses = [], requireRoles = [] } = {}) => {
  const { isPending, isAuthenticated, user } = useCurrentUser()

  const hasRequiredStatus =
    requireStatuses.length === 0 || requireStatuses.includes(user?.status)

  const hasRequiredRole =
    requireRoles.length === 0 || requireRoles.includes(user?.role)

  const hasAccess = isAuthenticated && hasRequiredStatus && hasRequiredRole

  return {
    isPending,
    isAuthenticated,
    hasAccess,
    status: user?.status || null,
    role: user?.role || null
  }
}

export default useHasAccess
