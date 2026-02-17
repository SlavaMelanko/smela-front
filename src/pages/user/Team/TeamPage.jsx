import { useCurrentUser } from '@/hooks/useAuth'
import { TeamPage as SharedTeamPage } from '@/pages/shared/Team'

export const TeamPage = () => {
  const { team } = useCurrentUser()

  return <SharedTeamPage teamId={team?.id} />
}
