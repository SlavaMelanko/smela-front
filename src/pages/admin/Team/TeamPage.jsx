import { useParams } from 'react-router-dom'

import { BackButton } from '@/components/buttons'
import { TeamInfoForm } from '@/components/form'
import { PageContent } from '@/components/PageContent'
import { TeamPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { getTeamTabs, TeamMembers, TeamTab } from '@/components/team'
import { Tabs, TabsContent, TabsLine } from '@/components/ui'
import { useHashTab } from '@/hooks/useHashTab'
import { useLocale } from '@/hooks/useLocale'
import { useTeam, useUpdateTeam } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'

export const TeamPage = () => {
  const { id: teamId } = useParams()
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const [activeTab, setActiveTab] = useHashTab(
    Object.values(TeamTab),
    TeamTab.INFO
  )

  const { data: team, isPending, isError, error, refetch } = useTeam(teamId)
  const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam(teamId)

  const submit = data => {
    updateTeam(data, {
      onSuccess: () => {
        showSuccessToast(t('changesSaved'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

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
          <TeamInfoForm
            team={team}
            isSubmitting={isUpdating}
            onSubmit={submit}
          />
        </TabsContent>
        <TabsContent value={TeamTab.MEMBERS}>
          <TeamMembers teamId={teamId} />
        </TabsContent>
      </Tabs>
    </PageContent>
  )
}
