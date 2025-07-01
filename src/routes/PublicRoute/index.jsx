import RootRedirect from '@/components/RootRedirect'
import useAuth from '@/hooks/useAuth'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return null
  }

  if (isAuthenticated) {
    return <RootRedirect />
  }

  return children
}

export default PublicRoute
