import { ChevronLeft, Info, Users } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

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

export const TeamPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const [activeTab, setActiveTab] = useHashTab(
    Object.values(TeamTab),
    TeamTab.INFO
  )

  const { data: team, isPending, isError, error, refetch } = useTeam(id)
  const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam(id)

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

  const membersCount = team.members?.length ?? 0

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
        membersCount > 0
          ? t('team.tabs.members.withCount', { count: membersCount })
          : t('team.tabs.members.label')
    }
  ]

  return (
    <PageContent>
      <div className='flex'>
        <Button variant='ghost' onClick={() => navigate('/admin/teams')}>
          <ChevronLeft className='size-4' />
          {t('back')}
        </Button>
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
          <Members teamId={id} />
        </TabsContent>
      </Tabs>
    </PageContent>
  )
}
