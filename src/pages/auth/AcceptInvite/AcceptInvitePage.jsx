import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAcceptInvite } from '@/hooks/useAuth'
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

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true })
    }
  }, [token, navigate])

  const handleAcceptInvite = data => {
    acceptInvite(
      { data: { token, password: data.newPassword } },
      {
        onSuccess: () => {
          showSuccessToast(t('invitation.accept.success'))
          navigate('/')
        },
        onError: error => {
          showErrorToast(te(error))
        }
      }
    )
  }

  if (!token) {
    return null
  }

  return (
    <AuthRoot>
      <AuthHeader>
        <AuthTitle>
          {t('invitation.accept.title', { companyName: t('companyName') })}
        </AuthTitle>
        <AuthDescription>{t('invitation.accept.description')}</AuthDescription>
      </AuthHeader>

      <AcceptInviteForm isLoading={isPending} onSubmit={handleAcceptInvite} />
    </AuthRoot>
  )
}
