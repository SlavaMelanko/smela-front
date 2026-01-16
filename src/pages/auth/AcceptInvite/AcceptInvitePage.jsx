import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAcceptInvite } from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useToast from '@/hooks/useToast'
import useUrlParams from '@/hooks/useUrlParams'
import { toTranslationKey } from '@/services/catch'

import { AcceptInviteForm } from './PasswordForm'

export const AcceptInvitePage = () => {
  const { t } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const navigate = useNavigate()
  const { token } = useUrlParams(['token'])
  const { mutate: acceptInvite, isPending } = useAcceptInvite()

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true })
    }
  }, [token, navigate])

  const handleSubmit = data => {
    acceptInvite(
      { data: { token, password: data.newPassword } },
      {
        onSuccess: () => {
          showSuccessToast(t('invitation.accept.success'))
          navigate('/')
        },
        onError: error => {
          showErrorToast(t(toTranslationKey(error)))
        }
      }
    )
  }

  if (!token) {
    return null
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-2xl font-semibold text-foreground'>
          {t('invitation.accept.title', { companyName: t('companyName') })}
        </h1>
        <p className='text-base text-muted-foreground'>
          {t('invitation.accept.description')}
        </p>
      </div>

      <AcceptInviteForm isLoading={isPending} onSubmit={handleSubmit} />
    </div>
  )
}
