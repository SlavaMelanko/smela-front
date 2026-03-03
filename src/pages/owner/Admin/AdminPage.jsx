import { Key, User } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { BackButton } from '@/components/buttons'
import { UserPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { Tabs, TabsContent, TabsLine } from '@/components/ui'
import { useHashTab } from '@/hooks/useHashTab'
import { useLocale } from '@/hooks/useLocale'
import { useAdmin } from '@/hooks/useOwner'
import { PageContent } from '@/pages/Page'

import { PermissionsTab } from './PermissionsTab'
import { ProfileTab } from './ProfileTab'

const UserTab = {
  PROFILE: 'profile',
  PERMISSIONS: 'permissions'
}

export const AdminPage = () => {
  const { id } = useParams()
  const { t, te } = useLocale()
  const [activeTab, setActiveTab] = useHashTab(
    Object.values(UserTab),
    UserTab.PROFILE
  )
  const { data: admin, isPending, isError, error, refetch } = useAdmin(id)

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !admin) {
    return <Spinner />
  }

  const tabs = [
    {
      value: UserTab.PROFILE,
      icon: User,
      label: () => t('profile')
    },
    {
      value: UserTab.PERMISSIONS,
      icon: Key,
      label: () => t('permissions.name')
    }
  ]

  return (
    <PageContent>
      <div className='flex'>
        <BackButton to='/owner/admins' />
      </div>
      <UserPageHeader user={admin} />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsLine tabs={tabs} />
        <TabsContent value={UserTab.PROFILE}>
          <ProfileTab admin={admin} />
        </TabsContent>
        <TabsContent value={UserTab.PERMISSIONS}>
          <PermissionsTab />
        </TabsContent>
      </Tabs>
    </PageContent>
  )
}
