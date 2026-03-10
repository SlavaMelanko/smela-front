import { MembershipSection } from '@/components/profile'
import { useUpdateMember } from '@/hooks/useTeam'

export const MembershipTab = ({ member, team }) => {
  const { mutate: update, isPending: isUpdating } = useUpdateMember(
    team?.id,
    member?.id
  )

  return (
    <MembershipSection
      member={member}
      team={team}
      teamLink='/team/info'
      update={update}
      isUpdating={isUpdating}
    />
  )
}
