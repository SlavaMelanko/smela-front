import { SearchX } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useLocale from '@/hooks/useLocale'
import { captureMessage } from '@/services/errorTracker'

import {
  Action,
  Container,
  Content,
  Description,
  Icon,
  Title
} from '../components'

const NotFound = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    captureMessage(`404 Not Found: ${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  return (
    <Container>
      <Icon as={SearchX} />
      <Content>
        <Title>{t('error.notFound.title')}</Title>
        <Description>{t('error.notFound.message')}</Description>
      </Content>
      <Action onClick={() => navigate('/')}>{t('error.notFound.cta')}</Action>
    </Container>
  )
}

export default NotFound
