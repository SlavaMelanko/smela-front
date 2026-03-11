import { MembershipSection } from '@/components/profile'
import { useTeamMember, useUpdateMember } from '@/hooks/useTeam'

export const MembershipTab = ({ user, team }) => {
  const { data: member } = useTeamMember(team.id, user.id)
  const { mutate: update, isPending: isUpdating } = useUpdateMember(
    team.id,
    user.id
  )

  return (
    <MembershipSection
      member={member}
      team={team}
      teamLink='/team'
      update={update}
      isUpdating={isUpdating}
    />
  )
}
