import { useParams } from 'react-router-dom'

import { BackButton } from '@/components/buttons'
import { UserInfoForm } from '@/components/form'
import { UserPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { useUpdateUser, useUser } from '@/hooks/useAdmin'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'
import { getFullName } from '@/lib/format/user'
import { PageContent } from '@/pages/Page'

export const UserPage = () => {
  const { id } = useParams()
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { data: user, isPending, isError, error, refetch } = useUser(id)
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser(id)

  const submit = data => {
    updateUser(data, {
      onSuccess: () => {
        showSuccessToast(t('update.success', { name: getFullName(user) }))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !user) {
    return <Spinner />
  }

  return (
    <PageContent>
      <div className='flex'>
        <BackButton to='/admin/users' />
      </div>
      <UserPageHeader user={user} />
      <UserInfoForm user={user} isSubmitting={isUpdating} onSubmit={submit} />
    </PageContent>
  )
}
