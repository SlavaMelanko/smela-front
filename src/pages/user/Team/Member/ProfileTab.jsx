import { ProfileSection } from '@/components/profile'
import { useUpdateMember } from '@/hooks/useTeam'

export const ProfileTab = ({ member, teamId }) => {
  const { mutate, isPending: isUpdating } = useUpdateMember(teamId, member?.id)

  return (
    <ProfileSection user={member} update={mutate} isUpdating={isUpdating} />
  )
}
