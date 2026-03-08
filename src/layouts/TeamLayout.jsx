import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { PageContent } from '@/components/PageContent'
import { TeamPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { getTeamTabs, TeamTab } from '@/components/team'
import { Tabs, TabsLine } from '@/components/ui'
import { useCurrentUser } from '@/hooks/useAuth'
import { useLocale } from '@/hooks/useLocale'
import { useTeam } from '@/hooks/useTeam'

// Handles /team/info AND /team/members/:id — index 1 is always the tab segment
const getActiveTab = pathname => {
  const segment = pathname.split('/').filter(Boolean)[1]

  return Object.values(TeamTab).includes(segment) ? segment : TeamTab.INFO
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

  const tabs = getTeamTabs(team, t)
  const activeTab = getActiveTab(location.pathname)

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
