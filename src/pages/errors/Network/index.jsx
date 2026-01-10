import { CloudAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import useLocale from '@/hooks/useLocale'
import useUrlParams from '@/hooks/useUrlParams'
import { NetworkErrorType } from '@/lib/net'

import {
  Action,
  Container,
  Content,
  Description,
  Icon,
  Title
} from '../components'

const Network = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const { errorType } = useUrlParams(['errorType'])

  return (
    <Container data-testid='network-error-page'>
      <Icon as={CloudAlert} />
      <Content>
        <Title>{t('error.network.title')}</Title>
        <Description>
          {t(`error.network.message.${errorType || NetworkErrorType.UNKNOWN}`)}
        </Description>
      </Content>
      <Action onClick={() => navigate(-1)}>{t('error.network.cta')}</Action>
    </Container>
  )
}

export default Network
