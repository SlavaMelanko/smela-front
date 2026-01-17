import { CloudAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import useLocale from '@/hooks/useLocale'
import useUrlParams from '@/hooks/useUrlParams'
import { NetworkErrorType } from '@/lib/net'

import { Action, Description, Icon, Title } from '../components'
import { Content, Root } from '../containers'

export const NetworkErrorPage = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const { errorType } = useUrlParams(['errorType'])

  return (
    <Root data-testid='network-error-page'>
      <Icon as={CloudAlert} />
      <Content>
        <Title>{t('error.network.title')}</Title>
        <Description>
          {t(`error.network.message.${errorType || NetworkErrorType.UNKNOWN}`)}
        </Description>
      </Content>
      <Action onClick={() => navigate(-1)}>{t('error.network.cta')}</Action>
    </Root>
  )
}
