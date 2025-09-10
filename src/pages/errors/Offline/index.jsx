import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { SecondaryButton } from '@/components/buttons'
import { WifiOffIcon } from '@/components/icons'
import useLocale from '@/hooks/useLocale'

const Offline = () => {
  const { t } = useLocale()
  const navigate = useNavigate()

  const handleRetry = () => {
    navigate('/')
  }

  return (
    <div className='offline-error-page'>
      <div className='offline-error-page__content'>
        <WifiOffIcon size='lg' color='orange' />

        <h1 className='offline-error-page__title'>
          {t('error.offline.title')}
        </h1>

        <p className='offline-error-page__description'>
          {t('error.offline.description')}
        </p>

        <SecondaryButton
          className='offline-error-page__cta'
          onClick={handleRetry}
        >
          {t('error.offline.cta')}
        </SecondaryButton>
      </div>
    </div>
  )
}

export default Offline
