import { Building2, ChevronLeft, Users } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { CompanyPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui'
import { useCompany, useUpdateCompany } from '@/hooks/useAdmin'
import useHashTab from '@/hooks/useHashTab'
import useLocale from '@/hooks/useLocale'
import useToast from '@/hooks/useToast'
import { toTranslationKey } from '@/services/catch'

import { CompanyInfoForm } from './CompanyInfoForm'
import { CompanyTeam } from './CompanyTeam'

const CompanyTab = {
  INFO: 'info',
  TEAM: 'team'
}

export const CompanyPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const [activeTab, setActiveTab] = useHashTab(
    Object.values(CompanyTab),
    CompanyTab.INFO
  )

  const { data: company, isPending, isError, error, refetch } = useCompany(id)
  const { mutate: updateCompany, isPending: isUpdating } = useUpdateCompany(id)

  const handleSubmit = data => {
    updateCompany(data, {
      onSuccess: () => {
        showSuccessToast(t('company.update.success'))
      },
      onError: err => {
        showErrorToast(t(toTranslationKey(err)))
      }
    })
  }

  if (isError) {
    return <ErrorState text={t(toTranslationKey(error))} onRetry={refetch} />
  }

  if (isPending && !company) {
    return <Spinner />
  }

  const teamCount = company.members?.length ?? 0

  const tabs = [
    {
      value: CompanyTab.INFO,
      icon: Building2,
      label: () => t('company.tabs.info')
    },
    {
      value: CompanyTab.TEAM,
      icon: Users,
      label: () =>
        teamCount > 0
          ? t('company.tabs.team.withCount', { count: teamCount })
          : t('company.tabs.team.label')
    }
  ]

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex'>
        <Button variant='ghost' onClick={() => navigate('/admin/companies')}>
          <ChevronLeft className='size-4' />
          {t('back')}
        </Button>
      </div>
      <CompanyPageHeader name={company.name} website={company.website} />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList variant='line' className='border-0'>
          {tabs.map(({ value, icon: Icon, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='after:bg-primary after:rounded-full'
            >
              <Icon className='size-4' />
              {label()}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={CompanyTab.INFO}>
          <CompanyInfoForm
            company={company}
            isSubmitting={isUpdating}
            onSubmit={handleSubmit}
          />
        </TabsContent>
        <TabsContent value={CompanyTab.TEAM}>
          <CompanyTeam companyId={id} members={company.members ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
