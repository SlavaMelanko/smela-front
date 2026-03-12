import { MembershipSection } from '@/components/profile'
import { useUpdateMembership } from '@/hooks/useTeam'

export const MembershipTab = ({ team, member }) => {
  const { mutate: update, isPending: isUpdating } = useUpdateMembership(
    team?.id,
    member?.id
  )

  return (
    <MembershipSection
      member={member}
      team={team}
      teamLink='/team/general'
      update={update}
      isUpdating={isUpdating}
    />
  )
}
