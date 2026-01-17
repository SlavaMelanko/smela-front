import { SearchX } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useLocale from '@/hooks/useLocale'
import { captureMessage } from '@/services/errorTracker'

import { Action, Description, Icon, Title } from '../components'
import { ErrorContent, ErrorRoot } from '../containers'

export const NotFoundErrorPage = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    captureMessage(`404 Not Found: ${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  return (
    <ErrorRoot data-testid='not-found-error-page'>
      <Icon as={SearchX} />
      <ErrorContent>
        <Title>{t('error.notFound.title')}</Title>
        <Description>{t('error.notFound.message')}</Description>
      </ErrorContent>
      <Action onClick={() => navigate('/')}>{t('error.notFound.cta')}</Action>
    </ErrorRoot>
  )
}
