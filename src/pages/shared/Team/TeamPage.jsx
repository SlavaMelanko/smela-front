import { ChevronLeft, Info, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { TeamPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { Button, Tabs, TabsContent, TabsLine } from '@/components/ui'
import { useHashTab } from '@/hooks/useHashTab'
import { useLocale } from '@/hooks/useLocale'
import { useTeam, useUpdateTeam } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'
import { PageContent } from '@/pages/Page'

import { Members } from './Members'
import { TeamInfoForm } from './TeamInfoForm'

const TeamTab = {
  INFO: 'info',
  MEMBERS: 'members'
}

export const TeamPage = ({ teamId, backPath }) => {
  const navigate = useNavigate()
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
        showSuccessToast(t('team.update.success'))
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
      {backPath && (
        <div className='flex'>
          <Button variant='ghost' onClick={() => navigate(backPath)}>
            <ChevronLeft className='size-4' />
            {t('back')}
          </Button>
        </div>
      )}
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
          <Members teamId={teamId} />
        </TabsContent>
      </Tabs>
    </PageContent>
  )
}
