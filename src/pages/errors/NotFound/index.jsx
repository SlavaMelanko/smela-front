import './styles.scss'

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { SearchXIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import useLocale from '@/hooks/useLocale'
import { captureMessage } from '@/services/errorTracker'

const NotFound = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    captureMessage(`404 Not Found: ${location.pathname}${location.search}`)
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

        <Button
          className='w-full mt-4'
          variant='outline'
          onClick={handleGoHome}
        >
          {t('error.notFound.cta')}
        </Button>
      </div>
    </div>
  )
}

export default NotFound
