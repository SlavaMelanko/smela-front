import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { SecondaryButton } from '@/components/buttons'
import { CloudAlertIcon } from '@/components/icons'
import useLocale from '@/hooks/useLocale'
import useUrlParams from '@/hooks/useUrlParams'
import { NetworkErrorType } from '@/lib/network-monitor'

const Network = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const { errorType } = useUrlParams(['errorType'])

  const handleRetry = () => {
    navigate(-1)
  }

  return (
    <div className='network-error-page'>
      <div className='network-error-page__content'>
        <CloudAlertIcon
          className='network-error-page__icon'
          size='lg'
          color='orange'
        />

        <h1 className='network-error-page__title'>
          {t('error.network.title')}
        </h1>

        <p className='network-error-page__description'>
          {t(`error.network.message.${errorType || NetworkErrorType.UNKNOWN}`)}
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
