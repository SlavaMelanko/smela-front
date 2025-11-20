import { Navigate } from 'react-router-dom'

import Spinner from '@/components/Spinner'
import { useCurrentUser } from '@/hooks/useAuth'
import {
  adminActiveStatuses,
  Role,
  userActiveStatuses,
  UserStatus
} from '@/lib/types'

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

  const role = user?.role

  if (
    isAuthenticated &&
    (role === Role.USER || role === Role.ENTERPRISE) &&
    userActiveStatuses.includes(status)
  ) {
    return <Navigate to='/home' replace />
  }

  if (
    isAuthenticated &&
    (role === Role.ADMIN || role === Role.OWNER) &&
    adminActiveStatuses.includes(status)
  ) {
    return <Navigate to='/admin/dashboard' replace />
  }

  return <Navigate to='/login' replace />
}

export default RootRedirect
