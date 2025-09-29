import { Navigate } from 'react-router-dom'

import Spinner from '@/components/Spinner'
import { useCurrentUser } from '@/hooks/useAuth'
import { UserStatus } from '@/lib/types'

const RootRedirect = () => {
  const { isPending, isAuthenticated, user, isError } = useCurrentUser()

  if (isError) {
    return <Navigate to='/login' replace />
  }

  if (isPending) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  const status = user?.status

  if (isAuthenticated && status === UserStatus.NEW) {
    return <Navigate to='/email-confirmation' replace />
  }

  if (
    isAuthenticated &&
    (status === UserStatus.VERIFIED || status === UserStatus.ACTIVE)
  ) {
    return <Navigate to='/home' replace />
  }

  return <Navigate to='/login' replace />
}

export default RootRedirect
