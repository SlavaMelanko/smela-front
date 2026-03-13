import { FieldName, ProfileSection } from '@/components/profile'
import { useUpdateTeamMember } from '@/hooks/useTeam'

export const ProfileTab = ({ team, member }) => {
  const { mutate, isPending: isUpdating } = useUpdateTeamMember(
    team?.id,
    member?.id
  )
  const update = (data, options) => mutate({ member: data }, options)

  return (
    <ProfileSection
      user={member}
      update={update}
      isUpdating={isUpdating}
      fieldsConfig={{ [FieldName.STATUS]: false }}
    />
  )
}
