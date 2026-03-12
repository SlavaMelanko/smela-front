import { MembershipSection } from '@/components/profile'
import { useTeamMember, useUpdateMembership } from '@/hooks/useTeam'

export const MembershipTab = ({ user, team }) => {
  const { data: member } = useTeamMember(team.id, user.id)
  const { mutate: update, isPending: isUpdating } = useUpdateMembership(
    team.id,
    user.id
  )

  return (
    <MembershipSection
      member={member}
      team={team}
      teamLink={`/admin/teams/${team.id}`}
      update={update}
      isUpdating={isUpdating}
    />
  )
}
