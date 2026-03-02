import { useParams } from 'react-router-dom'

import { UserPageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { useLocale } from '@/hooks/useLocale'
import { useAdmin } from '@/hooks/useOwner'
import { PageContent } from '@/pages/Page'

export const AdminPage = () => {
  const { id } = useParams()
  const { te } = useLocale()
  const { data: admin, isPending, isError, error, refetch } = useAdmin(id)

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !admin) {
    return <Spinner />
  }

  return (
    <PageContent>
      <UserPageHeader
        firstName={admin.firstName}
        lastName={admin.lastName}
        email={admin.email}
      />
    </PageContent>
  )
}
