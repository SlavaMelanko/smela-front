import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { TextSeparator } from '@/components/Separator'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui'
import { useCompany } from '@/hooks/useAdmin'
import useLocale from '@/hooks/useLocale'

import { DetailsForm } from './DetailsForm'

export const CompanyPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useLocale()

  const { data: company, isPending, isError } = useCompany(id)

  const handleSubmit = data => {
    // TODO: implement update
    console.warn('Submit:', data)
  }

  if (isPending) {
    return <Spinner text={t('loading')} />
  }

  if (isError) {
    return <p>{t('error.loading')}</p>
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex'>
        <Button variant='ghost' onClick={() => navigate('/admin/companies')}>
          <ChevronLeft className='size-5' />
          {t('back')}
        </Button>
      </div>
      <TextSeparator text={t('details')} />
      <DetailsForm
        company={company}
        isLoading={isPending}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
