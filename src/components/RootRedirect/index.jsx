import { Navigate } from 'react-router-dom'

import { Spinner } from '@/components/Spinner'
import useAuth from '@/hooks/useAuth'
import { UserStatus } from '@/lib/types'

const RootRedirect = () => {
  const { loading, isAuthenticated, profile } = useAuth()

  if (loading) {
    return <Spinner centered />
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  const status = profile?.status

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
