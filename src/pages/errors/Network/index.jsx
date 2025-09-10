import './styles.scss'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { SecondaryButton } from '@/components/buttons'
import { WifiOffIcon } from '@/components/icons'
import useLocale from '@/hooks/useLocale'
import { NetworkErrorType } from '@/lib/network-monitor'

const Network = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const errorType = searchParams.get('type') || NetworkErrorType.UNKNOWN

  const handleRetry = () => {
    navigate(-1)
  }

  return (
    <div className='network-error-page'>
      <div className='network-error-page__content'>
        <WifiOffIcon
          className='network-error-page__icon'
          size='lg'
          color='orange'
        />

        <h1 className='network-error-page__title'>
          {t('error.network.title')}
        </h1>

        <p className='network-error-page__description'>
          {t(`error.network.message.${errorType}`)}
        </p>

        <SecondaryButton
          className='network-error-page__cta'
          onClick={handleRetry}
        >
          {t('error.network.cta')}
        </SecondaryButton>
      </div>
    </div>
  )
}

export default Network
