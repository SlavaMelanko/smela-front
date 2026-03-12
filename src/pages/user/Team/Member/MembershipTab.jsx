import { MembershipSection } from '@/components/profile'
import { useUpdateMember } from '@/hooks/useTeam'

export const MembershipTab = ({ team, member }) => {
  const { mutate: update, isPending: isUpdating } = useUpdateMember(
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
