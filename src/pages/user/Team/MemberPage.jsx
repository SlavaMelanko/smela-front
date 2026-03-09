import { useParams } from 'react-router'
import { useOutletContext } from 'react-router'

import { MembershipSection } from '@/components/profile'
import { useTeamMember, useUpdateMember } from '@/hooks/useTeam'

export const MemberPage = () => {
  const { id: memberId } = useParams()
  const { team } = useOutletContext()
  const { id: teamId } = team
  const { data: member } = useTeamMember(teamId, memberId)
  const { mutate: update, isPending: isUpdating } = useUpdateMember(
    teamId,
    memberId
  )

  return (
    <MembershipSection
      member={member}
      team={team}
      update={update}
      isUpdating={isUpdating}
    />
  )
}
