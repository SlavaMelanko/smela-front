import useAuth from '@/hooks/useAuth'

const useHasAccess = ({ requireStatuses = [], requireRoles = [] } = {}) => {
  const { loading, isAuthenticated, profile } = useAuth()

  const hasRequiredStatus =
    requireStatuses.length === 0 || requireStatuses.includes(profile?.status)

  const hasRequiredRole =
    requireRoles.length === 0 || requireRoles.includes(profile?.role)

  const hasAccess = isAuthenticated && hasRequiredStatus && hasRequiredRole

  return {
    loading,
    isAuthenticated,
    hasAccess,
    status: profile?.status || null,
    role: profile?.role || null
  }
}

export default useHasAccess
