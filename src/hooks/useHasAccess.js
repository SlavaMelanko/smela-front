import { useCurrentUser } from '@/hooks/useAuth'

const useHasAccess = ({ requireStatuses = [], requireRoles = [] } = {}) => {
  const { isPending, isError, isSuccess, isAuthenticated, user } =
    useCurrentUser()

  const hasRequiredStatus =
    requireStatuses.length === 0 || requireStatuses.includes(user?.status)

  const hasRequiredRole =
    requireRoles.length === 0 || requireRoles.includes(user?.role)

  const hasAccess = isAuthenticated && hasRequiredStatus && hasRequiredRole

  // We're still loading if:
  // 1. Query is in pending state (initial load)
  // 2. Query hasn't completed yet (no success or error state)
  const isLoading = isPending || (!isSuccess && !isError)

  return {
    isPending: isLoading,
    isAuthenticated,
    hasAccess,
    status: user?.status || null,
    role: user?.role || null
  }
}

export default useHasAccess
