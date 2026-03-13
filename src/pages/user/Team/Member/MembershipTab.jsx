import { MembershipSection } from '@/components/profile'
import { useUpdateTeamMember } from '@/hooks/useTeam'

export const MembershipTab = ({ team, member }) => {
  const { mutate, isPending: isUpdating } = useUpdateTeamMember(
    team?.id,
    member?.id
  )
  const update = (data, options) => mutate({ membership: data }, options)

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
