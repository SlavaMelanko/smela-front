import { ServerCrash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import useLocale from '@/hooks/useLocale'

import { Action, Description, Icon, Title } from '../components'
import { Content, Root } from '../containers'

export const GeneralErrorPage = () => {
  const { t } = useLocale()
  const navigate = useNavigate()

  return (
    <Root data-testid='general-error-page'>
      <Icon as={ServerCrash} />
      <Content>
        <Title>{t('error.general.title')}</Title>
        <Description>{t('error.general.message')}</Description>
      </Content>
      <Action onClick={() => navigate('/')}>{t('error.general.cta')}</Action>
    </Root>
  )
}
