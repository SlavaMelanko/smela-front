import { ProfileSection } from '@/components/profile'
import { useUpdateMember } from '@/hooks/useTeam'

export const ProfileTab = ({ team, member }) => {
  const { mutate, isPending: isUpdating } = useUpdateMember(
    team?.id,
    member?.id
  )

  return (
    <ProfileSection user={member} update={mutate} isUpdating={isUpdating} />
  )
}
