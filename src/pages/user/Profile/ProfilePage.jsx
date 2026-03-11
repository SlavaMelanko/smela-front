import { PageContent } from '@/components/PageContent'
import { ProfilePageHeader } from '@/components/PageHeader'
import {
  getUserTabs,
  getUserTabValues,
  ProfileTab as Tab
} from '@/components/profile'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { Tabs, TabsContent, TabsLine } from '@/components/ui'
import { useCurrentUser } from '@/hooks/useAuth'
import { useHashTab } from '@/hooks/useHashTab'
import { useLocale } from '@/hooks/useLocale'

import { MembershipTab } from './MembershipTab'
import { ProfileTab } from './ProfileTab'

export const ProfilePage = () => {
  const { t } = useLocale()
  const { user: me, team: myTeam, isPending, isError, error } = useCurrentUser()

  const hasMembership = !isPending && !!myTeam
  const [activeTab, setActiveTab] = useHashTab(
    getUserTabValues(hasMembership),
    Tab.PROFILE
  )

  if (isError) {
    return <ErrorState error={error} />
  }

  if (isPending && !me) {
    return <Spinner />
  }

  return (
    <PageContent>
      <ProfilePageHeader user={me} />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsLine tabs={getUserTabs(hasMembership, t)} />
        <TabsContent value={Tab.PROFILE}>
          <ProfileTab user={me} />
        </TabsContent>
        {hasMembership && (
          <TabsContent value={Tab.MEMBERSHIP}>
            <MembershipTab user={me} team={myTeam} />
          </TabsContent>
        )}
      </Tabs>
    </PageContent>
  )
}
