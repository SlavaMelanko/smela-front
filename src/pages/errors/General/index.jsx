import { ServerCrash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import useLocale from '@/hooks/useLocale'

import {
  Action,
  Container,
  Content,
  Description,
  Icon,
  Title
} from '../components'

const General = () => {
  const { t } = useLocale()
  const navigate = useNavigate()

  return (
    <Container data-testid='general-error-page'>
      <Icon as={ServerCrash} />
      <Content>
        <Title>{t('error.general.title')}</Title>
        <Description>{t('error.general.message')}</Description>
      </Content>
      <Action onClick={() => navigate('/')}>{t('error.general.cta')}</Action>
    </Container>
  )
}

export default General
