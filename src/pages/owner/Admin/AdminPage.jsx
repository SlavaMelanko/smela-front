import { useParams } from 'react-router-dom'

import { BackButton } from '@/components/buttons'
import { UserInfoForm } from '@/components/form'
import { UserPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { useLocale } from '@/hooks/useLocale'
import { useAdmin, useUpdateAdmin } from '@/hooks/useOwner'
import { useToast } from '@/hooks/useToast'
import { getFullName } from '@/lib/format/user'
import { PageContent } from '@/pages/Page'

export const AdminPage = () => {
  const { id } = useParams()
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { data: admin, isPending, isError, error, refetch } = useAdmin(id)
  const { mutate: updateAdmin, isPending: isUpdating } = useUpdateAdmin(id)

  const submit = data => {
    updateAdmin(data, {
      onSuccess: () => {
        showSuccessToast(t('update.success', { name: getFullName(data) }))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !admin) {
    return <Spinner />
  }

  return (
    <PageContent>
      <div className='flex'>
        <BackButton to='/owner/admins' />
      </div>
      <UserPageHeader user={admin} />
      <UserInfoForm user={admin} isSubmitting={isUpdating} onSubmit={submit} />
    </PageContent>
  )
}
