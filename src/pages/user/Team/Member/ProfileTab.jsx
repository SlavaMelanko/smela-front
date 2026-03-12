import { FieldName, ProfileSection } from '@/components/profile'
import { useUpdateMembership } from '@/hooks/useTeam'

export const ProfileTab = ({ team, member }) => {
  const { mutate, isPending: isUpdating } = useUpdateMembership(
    team?.id,
    member?.id
  )

  return (
    <ProfileSection
      user={member}
      update={mutate}
      isUpdating={isUpdating}
      fieldsConfig={{ [FieldName.STATUS]: false }}
    />
  )
}
