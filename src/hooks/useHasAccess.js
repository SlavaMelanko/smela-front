import { useCurrentUser } from '@/hooks/useAuth'

export const useHasAccess = ({
  requireStatuses = [],
  requireRoles = []
} = {}) => {
  const { isFetching, isAuthenticated, user } = useCurrentUser()

  const hasRequiredStatus =
    requireStatuses.length === 0 || requireStatuses.includes(user?.status)

  const hasRequiredRole =
    requireRoles.length === 0 || requireRoles.includes(user?.role)

  const hasAccess = isAuthenticated && hasRequiredStatus && hasRequiredRole

  return {
    isFetching,
    isAuthenticated,
    hasAccess,
    status: user?.status || null,
    role: user?.role || null
  }
}
