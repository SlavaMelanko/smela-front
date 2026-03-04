import { User, Users } from 'lucide-react'
import { useLocation, useParams } from 'react-router-dom'

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

const getUserTabIds = hasMembership => {
  const tabIds = [UserTab.PROFILE]

  if (hasMembership) {
    tabIds.push(UserTab.MEMBERSHIP)
  }

  return tabIds
}

export const UserPage = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const { t, te } = useLocale()
  const {
    data: user,
    isPending,
    isError,
    error,
    refetch
  } = useUser(id, {
    initialData: state?.user ? { user: state.user } : undefined
  })

  const hasMembership = !isPending && !!user?.team
  const [activeTab, setActiveTab] = useHashTab(
    getUserTabIds(hasMembership),
    UserTab.PROFILE
  )

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
    ...(hasMembership
      ? [
          {
            value: UserTab.MEMBERSHIP,
            icon: Users,
            label: () => t('membership')
          }
        ]
      : [])
  ]

  return (
    <PageContent>
      <div className='flex'>
        <BackButton />
      </div>
      <UserPageHeader user={user} />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsLine tabs={tabs} />
        <TabsContent value={UserTab.PROFILE}>
          <ProfileTab user={user} />
        </TabsContent>
        {hasMembership && (
          <TabsContent value={UserTab.MEMBERSHIP}>
            <MembershipTab user={user} />
          </TabsContent>
        )}
      </Tabs>
    </PageContent>
  )
}
