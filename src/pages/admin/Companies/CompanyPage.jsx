import { ChevronLeft, Info, Users } from 'lucide-react'
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
import useToast from '@/hooks/useToast'
import { toTranslationKey } from '@/services/catch'

import { CompanyDetailsForm } from './CompanyDetailsForm'

const CompanyTab = {
  DETAILS: 'details',
  MEMBERS: 'members'
}

export const CompanyPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()

  const { data: company, isPending, isError } = useCompany(id)
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
      <Tabs defaultValue={CompanyTab.DETAILS}>
        <TabsList variant='line' className='border-0'>
          <TabsTrigger
            value={CompanyTab.DETAILS}
            className='after:bg-primary after:rounded-full'
          >
            <Info className='size-4' />
            {t('company.tabs.details')}
          </TabsTrigger>
          <TabsTrigger
            value={CompanyTab.MEMBERS}
            className='after:bg-primary after:rounded-full'
          >
            <Users className='size-4' />
            {membersLabel}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={CompanyTab.DETAILS}>
          <CompanyDetailsForm
            company={company}
            isLoading={isPending}
            isSubmitting={isUpdating}
            onSubmit={handleSubmit}
          />
        </TabsContent>
        <TabsContent value='members'>{/* Members content */}</TabsContent>
      </Tabs>
    </div>
  )
}
