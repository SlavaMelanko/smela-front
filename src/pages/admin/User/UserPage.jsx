import { User, Users } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { BackButton } from '@/components/buttons'
import { UserPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { Tabs, TabsContent, TabsLine } from '@/components/ui'
import { useUser } from '@/hooks/useAdmin'
import { useHashTab } from '@/hooks/useHashTab'
import { useLocale } from '@/hooks/useLocale'
import { PageContent } from '@/pages/Page'

import { MembershipTab } from './MembershipTab'
import { ProfileTab } from './ProfileTab'

const UserTab = {
  PROFILE: 'profile',
  MEMBERSHIP: 'membership'
}

export const UserPage = () => {
  const { id } = useParams()
  const { t, te } = useLocale()
  const [activeTab, setActiveTab] = useHashTab(
    Object.values(UserTab),
    UserTab.PROFILE
  )
  const { data: user, isPending, isError, error, refetch } = useUser(id)

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
          <ProfileTab user={user} />
        </TabsContent>
        <TabsContent value={UserTab.MEMBERSHIP}>
          <MembershipTab />
        </TabsContent>
      </Tabs>
    </PageContent>
  )
}
