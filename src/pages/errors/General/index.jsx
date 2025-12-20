import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { WarningIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
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

        <Button
          className='w-full mt-4'
          variant='outline'
          onClick={handleGoHome}
        >
          {t('error.general.cta')}
        </Button>
      </div>
    </div>
  )
}

export default General
