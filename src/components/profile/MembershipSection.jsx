import { MembershipForm } from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'

import { TextSeparator } from '../Separator'

export const MembershipSection = ({
  member,
  team,
  teamLink,
  update,
  isUpdating
}) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()

  const handleUpdate = data => {
    update(data, {
      onSuccess: () => {
        showSuccessToast(t('changesSaved'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  return (
    <>
      <MembershipForm
        member={member}
        team={team}
        teamLink={teamLink}
        isSubmitting={isUpdating}
        onSubmit={handleUpdate}
      />
      <TextSeparator />
    </>
  )
}
