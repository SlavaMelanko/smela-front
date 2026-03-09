import { useNavigate, useParams } from 'react-router-dom'

import { BackButton } from '@/components/buttons'
import { PageContent } from '@/components/PageContent'
import { TeamPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import {
  getTeamTabs,
  TeamInfoSection,
  TeamMembersSection,
  TeamTab
} from '@/components/team'
import { Tabs, TabsContent, TabsLine } from '@/components/ui'
import { useHashTab } from '@/hooks/useHashTab'
import { useLocale } from '@/hooks/useLocale'
import { useTeam } from '@/hooks/useTeam'

export const TeamPage = () => {
  const { id: teamId } = useParams()
  const navigate = useNavigate()
  const { t, te } = useLocale()
  const [activeTab, setActiveTab] = useHashTab(
    Object.values(TeamTab),
    TeamTab.INFO
  )

  const { data: team, isPending, isError, error, refetch } = useTeam(teamId)

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !team) {
    return <Spinner />
  }

  const tabs = getTeamTabs(team, t)

  return (
    <PageContent>
      <div className='flex'>
        <BackButton />
      </div>
      <TeamPageHeader name={team.name} website={team.website} />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsLine tabs={tabs} />
        <TabsContent value={TeamTab.INFO}>
          <TeamInfoSection team={team} />
        </TabsContent>
        <TabsContent value={TeamTab.MEMBERS}>
          <TeamMembersSection
            teamId={teamId}
            onRowClick={member => navigate(`/admin/users/${member.id}`)}
          />
        </TabsContent>
      </Tabs>
    </PageContent>
  )
}
