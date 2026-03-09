import { useNavigate, useOutletContext } from 'react-router-dom'

import { TeamMembers } from '@/components/team'

export const TeamMembersPage = () => {
  const { team } = useOutletContext()
  const navigate = useNavigate()

  return (
    <TeamMembers
      teamId={team.id}
      onRowClick={member => navigate(`/team/members/${member.id}`)}
    />
  )
}
