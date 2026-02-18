import { Navigate } from 'react-router-dom'

import { useCurrentUser } from '@/hooks/useAuth'
import { TeamPage as SharedTeamPage } from '@/pages/shared/Team'

export const TeamPage = () => {
  const { team } = useCurrentUser()

  if (!team) {
    return <Navigate to='/not-found' replace />
  }

  return <SharedTeamPage teamId={team.id} />
}
