import { useNavigate, useOutletContext } from 'react-router-dom'

import { TeamMembers } from '@/pages/shared/Team/TeamMembers'

export const TeamMembersPage = () => {
  const { teamId } = useOutletContext()
  const navigate = useNavigate()

  return (
    <TeamMembers
      teamId={teamId}
      onRowClick={member => navigate(`/team/members/${member.id}`)}
    />
  )
}
