import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { SecondaryButton } from '@/components/buttons'
import { SearchXIcon } from '@/components/icons'
import useLocale from '@/hooks/useLocale'

const NotFound = () => {
  const { t } = useLocale()
  const navigate = useNavigate()

  // TODO: Report requested path URL to external services like Sentry, Bugsnag, etc.
  // This helps track which pages users are trying to access but don't exist.
  // Example: errorTracker.captureException(new Error(`404 Not Found: ${location.pathname}${location.search}`))
  // Available data: location.pathname (e.g., "/missing-page"), location.search (e.g., "?param=value")

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
