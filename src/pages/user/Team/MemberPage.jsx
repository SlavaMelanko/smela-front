import { User } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { BackButton } from '@/components/buttons'
import { FormField, FormFields, FormReadOnly, FormRow } from '@/components/form'
import { EmailLink } from '@/components/links'
import { UserPageHeader } from '@/components/PageHeader'
import { TextSeparator } from '@/components/Separator'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { Tabs, TabsContent, TabsLine } from '@/components/ui'
import { StatusBadge } from '@/components/UserStatus'
import { useCurrentUser } from '@/hooks/useAuth'
import { useLocale } from '@/hooks/useLocale'
import { useTeamMember } from '@/hooks/useTeam'
import { PageContent } from '@/pages/Page'

const MemberTab = {
  PROFILE: 'profile'
}

export const MemberPage = () => {
  const { id } = useParams()
  const { team } = useCurrentUser()
  const { t, te, formatDate } = useLocale()

  const {
    data: member,
    isPending,
    isError,
    error,
    refetch
  } = useTeamMember(team?.id, id)

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !member) {
    return <Spinner />
  }

  const tabs = [
    {
      value: MemberTab.PROFILE,
      icon: User,
      label: () => t('profile')
    }
  ]

  return (
    <PageContent>
      <div className='flex'>
        <BackButton />
      </div>
      <UserPageHeader user={member} />
      <Tabs defaultValue={MemberTab.PROFILE}>
        <TabsLine tabs={tabs} />
        <TabsContent value={MemberTab.PROFILE}>
          <FormFields>
            <FormRow>
              <FormField label={t('email.label')} optional>
                <FormReadOnly>
                  <EmailLink email={member.email} />
                </FormReadOnly>
              </FormField>
              <FormField label={t('status.name')} optional>
                <FormReadOnly>
                  <StatusBadge status={member.status} />
                </FormReadOnly>
              </FormField>
            </FormRow>

            <TextSeparator />

            <FormRow forceColumns>
              <FormField label={t('position.label')} optional>
                <FormReadOnly>{member.position ?? '—'}</FormReadOnly>
              </FormField>
              <FormField label={t('joinedAt')} optional>
                <FormReadOnly>{formatDate(member.joinedAt)}</FormReadOnly>
              </FormField>
            </FormRow>
          </FormFields>
        </TabsContent>
      </Tabs>
    </PageContent>
  )
}
