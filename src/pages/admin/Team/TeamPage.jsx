import { useParams } from 'react-router-dom'

import { TeamPage as SharedTeamPage } from '@/pages/shared/Team'

export const TeamPage = () => {
  const { id } = useParams()

  return <SharedTeamPage teamId={id} backPath='/admin/teams' />
}
