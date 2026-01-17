import { ServerCrash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import useLocale from '@/hooks/useLocale'

import { Action, Description, Icon, Title } from '../components'
import { ErrorContent, ErrorRoot } from '../containers'

export const GeneralErrorPage = () => {
  const { t } = useLocale()
  const navigate = useNavigate()

  return (
    <ErrorRoot data-testid='general-error-page'>
      <Icon as={ServerCrash} />
      <ErrorContent>
        <Title>{t('error.general.title')}</Title>
        <Description>{t('error.general.message')}</Description>
      </ErrorContent>
      <Action onClick={() => navigate('/')}>{t('error.general.cta')}</Action>
    </ErrorRoot>
  )
}
