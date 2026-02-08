import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '@/components/Spinner'
import { useAcceptInvite, useCheckInvite } from '@/hooks/useAuth'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'
import { useUrlParams } from '@/hooks/useUrlParams'

import { AuthDescription, AuthHeader, AuthRoot, AuthTitle } from '../Auth'
import { AcceptInviteForm } from './PasswordForm'

export const AcceptInvitePage = () => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const navigate = useNavigate()
  const { token } = useUrlParams(['token'])
  const { mutate: acceptInvite, isPending } = useAcceptInvite()
  const { data, isPending: isChecking, isError, error } = useCheckInvite(token)

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true })
    }
  }, [token, navigate])

  useEffect(() => {
    if (isError) {
      showErrorToast(te(error))
      navigate('/', { replace: true })
    }
  }, [isError, error, te, showErrorToast, navigate])

  const handleAcceptInvite = data => {
    acceptInvite(
      { data: { token, password: data.newPassword } },
      {
        onSuccess: () => {
          showSuccessToast(t('invitation.accept.success'))
          navigate('/')
        },
        onError: err => {
          showErrorToast(te(err))
        }
      }
    )
  }

  if (!token || isError) {
    return null
  }

  if (isChecking) {
    return <Spinner />
  }

  return (
    <AuthRoot>
      <AuthHeader>
        <AuthTitle>
          {t('invitation.accept.title', { teamName: data?.teamName })}
        </AuthTitle>
        <AuthDescription>{t('invitation.accept.description')}</AuthDescription>
      </AuthHeader>

      <AcceptInviteForm isLoading={isPending} onSubmit={handleAcceptInvite} />
    </AuthRoot>
  )
}
