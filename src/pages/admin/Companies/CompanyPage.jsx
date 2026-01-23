import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { CompanyBadge } from '@/components/badges'
import { Spinner } from '@/components/Spinner'
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui'
import { useCompany, useUpdateCompany } from '@/hooks/useAdmin'
import useLocale from '@/hooks/useLocale'

import { CompanyDetailsForm } from './CompanyDetailsForm'

export const CompanyPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useLocale()

  const { data: company, isPending, isError } = useCompany(id)
  const { mutate: updateCompany } = useUpdateCompany(id)

  const handleSubmit = data => {
    updateCompany(data)
  }

  if (isPending) {
    return <Spinner text={t('loading')} />
  }

  if (isError) {
    return <p>{t('error.loading')}</p>
  }

  const membersCount = company.members?.length ?? 0
  const membersLabel =
    membersCount > 0
      ? t('company.tabs.members.withCount', { count: membersCount })
      : t('company.tabs.members.label')

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex'>
        <Button variant='ghost' onClick={() => navigate('/admin/companies')}>
          <ChevronLeft className='size-5' />
          {t('back')}
        </Button>
      </div>
      <CompanyBadge name={company.name} website={company.website} />
      <Tabs defaultValue='details'>
        <TabsList variant='line' className='border-0'>
          <TabsTrigger
            value='details'
            className='after:bg-primary after:rounded-full'
          >
            {t('company.tabs.details')}
          </TabsTrigger>
          <TabsTrigger
            value='members'
            className='after:bg-primary after:rounded-full'
          >
            {membersLabel}
          </TabsTrigger>
        </TabsList>
        <TabsContent value='details'>
          <CompanyDetailsForm
            company={company}
            isLoading={isPending}
            onSubmit={handleSubmit}
          />
        </TabsContent>
        <TabsContent value='members'>{/* Members content */}</TabsContent>
      </Tabs>
    </div>
  )
}
