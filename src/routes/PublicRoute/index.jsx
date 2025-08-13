import RootRedirect from '@/components/RootRedirect'
import { useCurrentUser } from '@/hooks/useAuth'

const PublicRoute = ({ children }) => {
  const { isPending, isAuthenticated } = useCurrentUser()

  if (isPending) {
    return null
  }

  if (isAuthenticated) {
    return <RootRedirect />
  }

  return children
}

export default PublicRoute
