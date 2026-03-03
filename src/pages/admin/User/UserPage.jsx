import { User, Users } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { BackButton } from '@/components/buttons'
import { UserInfoForm } from '@/components/form'
import { UserPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { Tabs, TabsContent, TabsLine } from '@/components/ui'
import { useUpdateUser, useUser } from '@/hooks/useAdmin'
import { useHashTab } from '@/hooks/useHashTab'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'
import { getFullName } from '@/lib/format/user'
import { PageContent } from '@/pages/Page'

const UserTab = {
  PROFILE: 'profile',
  MEMBERSHIP: 'membership'
}

export const UserPage = () => {
  const { id } = useParams()
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const [activeTab, setActiveTab] = useHashTab(
    Object.values(UserTab),
    UserTab.PROFILE
  )
  const { data: user, isPending, isError, error, refetch } = useUser(id)
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser(id)

  const submit = data => {
    updateUser(data, {
      onSuccess: () => {
        showSuccessToast(t('update.success', { name: getFullName(data) }))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !user) {
    return <Spinner />
  }

  const tabs = [
    {
      value: UserTab.PROFILE,
      icon: User,
      label: () => t('profile')
    },
    {
      value: UserTab.MEMBERSHIP,
      icon: Users,
      label: () => t('membership')
    }
  ]

  return (
    <PageContent>
      <div className='flex'>
        <BackButton to='/admin/users' />
      </div>
      <UserPageHeader user={user} />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsLine tabs={tabs} />
        <TabsContent value={UserTab.PROFILE}>
          <UserInfoForm
            user={user}
            isSubmitting={isUpdating}
            onSubmit={submit}
          />
        </TabsContent>
        <TabsContent value={UserTab.MEMBERSHIP}>
          <p>user membership</p>
        </TabsContent>
      </Tabs>
    </PageContent>
  )
}
