import { Navigate } from 'react-router-dom'

import Spinner from '@/components/Spinner'
import { useCurrentUser } from '@/hooks/useAuth'
import { userActiveStatuses } from '@/lib/types'

const PublicRoute = ({ children }) => {
  const { isPending, isAuthenticated, user } = useCurrentUser()

  if (isPending) {
    return <Spinner centered />
  }

  if (isAuthenticated && userActiveStatuses.includes(user?.status)) {
    return <Navigate to='/' replace />
  }

  return children
}

export default PublicRoute
