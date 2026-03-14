import { UserMinus } from 'lucide-react'

import { RemoveTeamMemberDialog } from '@/components/dialogs'
import { MembershipForm } from '@/components/form'
import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle
} from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useDeleteMember } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'

import { PageContent } from '../PageContent'
import { TextSeparator } from '../Separator'

export const MembershipSection = ({
  member,
  team,
  teamLink,
  update,
  isUpdating
}) => {
  const { t, te } = useLocale()
  const { openModal } = useModal()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: deleteMember } = useDeleteMember(team?.id)

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

  const handleRemove = () => {
    const close = openModal({
      children: (
        <RemoveTeamMemberDialog
          member={member}
          onClose={() => close()}
          onConfirm={() => {
            close()
            deleteMember(member.id, {
              onSuccess: () => {
                showSuccessToast(t('team.members.remove.success'))
              },
              onError: error => {
                showErrorToast(te(error))
              }
            })
          }}
        />
      )
    })
  }

  return (
    <PageContent>
      <MembershipForm
        member={member}
        team={team}
        teamLink={teamLink}
        isSubmitting={isUpdating}
        onSubmit={handleUpdate}
      />
      <TextSeparator />
      <Item variant='outline' className='border-destructive/20'>
        <ItemMedia variant='icon'>
          <UserMinus />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className='text-base'>
            {t('team.members.remove.title')}
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant='destructive' onClick={handleRemove}>
            {t('team.members.remove.cta')}
          </Button>
        </ItemActions>
      </Item>
    </PageContent>
  )
}
