import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { SecondaryButton } from '@/components/buttons'
import { WarningIcon } from '@/components/icons'
import useLocale from '@/hooks/useLocale'

const General = () => {
  const { t } = useLocale()
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className='general-error-page'>
      <div className='general-error-page__content'>
        <WarningIcon
          className='general-error-page__icon'
          size='lg'
          color='orange'
        />

        <h1 className='general-error-page__title'>
          {t('error.general.title')}
        </h1>

        <p className='general-error-page__description'>
          {t('error.general.message')}
        </p>

        <SecondaryButton
          className='general-error-page__cta'
          onClick={handleGoHome}
        >
          {t('error.general.cta')}
        </SecondaryButton>
      </div>
    </div>
  )
}

export default General
