import RootRedirect from '@/components/RootRedirect'
import useAuth from '@/hooks/useAuth'

const PublicRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return <RootRedirect />
  }

  return children
}

export default PublicRoute
