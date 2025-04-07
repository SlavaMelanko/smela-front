import { Navigate } from 'react-router-dom'

const isAuthenticated = () => {
  return false
}

const RootRedirect = () => {
  if (isAuthenticated()) {
    return <Navigate to='/dashboard' replace /> // TODO: Implement this route
  }

  return <Navigate to='/login' replace />
}

export default RootRedirect
