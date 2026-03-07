import { Info, Users } from 'lucide-react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { TeamPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { Tabs, TabsLine } from '@/components/ui'
import { useCurrentUser } from '@/hooks/useAuth'
import { useLocale } from '@/hooks/useLocale'
import { useTeam } from '@/hooks/useTeam'
import { PageContent } from '@/pages/Page'

const TeamTab = {
  INFO: 'info',
  MEMBERS: 'members'
}

export const TeamLayout = () => {
  const { team: currentTeam } = useCurrentUser()
  const location = useLocation()
  const navigate = useNavigate()
  const { t, te } = useLocale()

  const {
    data: team,
    isPending,
    isError,
    error,
    refetch
  } = useTeam(currentTeam?.id, { enabled: !!currentTeam })

  if (!currentTeam) {
    return <Navigate to='/not-found' replace />
  }

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !team) {
    return <Spinner />
  }

  // Handles /team/members AND /team/members/:id — index 1 is always the tab segment
  const pathParts = location.pathname.split('/').filter(Boolean)
  const tabSegment = pathParts[1]
  const activeTab = Object.values(TeamTab).includes(tabSegment)
    ? tabSegment
    : TeamTab.INFO

  const tabs = [
    {
      value: TeamTab.INFO,
      icon: Info,
      label: () => t('team.tabs.info')
    },
    {
      value: TeamTab.MEMBERS,
      icon: Users,
      label: () =>
        team.memberCount > 0
          ? t('team.tabs.members.withCount', { count: team.memberCount })
          : t('team.tabs.members.label')
    }
  ]

  return (
    <PageContent>
      <TeamPageHeader name={team.name} website={team.website} />
      <Tabs
        value={activeTab}
        onValueChange={value => navigate(`/team/${value}`)}
      >
        <TabsLine tabs={tabs} />
        <Outlet context={{ team, teamId: currentTeam.id }} />
      </Tabs>
    </PageContent>
  )
}
