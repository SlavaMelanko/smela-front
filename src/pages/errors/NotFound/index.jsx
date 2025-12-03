import './styles.scss'

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { SecondaryButton } from '@/components/buttons'
import { SearchXIcon } from '@/components/icons'
import useLocale from '@/hooks/useLocale'
import { captureMessage } from '@/services/errorTracker'

const NotFound = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    captureMessage(
      `404 Not Found: ${location.pathname}${location.search}`,
      'warning'
    )
  }, [location.pathname, location.search])

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className='not-found-error-page'>
      <div className='not-found-error-page__content'>
        <SearchXIcon
          className='not-found-error-page__icon'
          size='lg'
          color='orange'
        />

        <h1 className='not-found-error-page__title'>
          {t('error.notFound.title')}
        </h1>

        <p className='not-found-error-page__description'>
          {t('error.notFound.message')}
        </p>

        <SecondaryButton
          className='not-found-error-page__cta'
          onClick={handleGoHome}
        >
          {t('error.notFound.cta')}
        </SecondaryButton>
      </div>
    </div>
  )
}

export default NotFound
