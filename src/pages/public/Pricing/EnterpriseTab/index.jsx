import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import useLocale from '@/hooks/useLocale'

const EnterpriseTab = () => {
  const { t } = useLocale()
  const navigate = useNavigate()

  return (
    <div className='enterprise-tab'>
      <p className='enterprise-tab__text'>{t('offer.enterprise.msg')}</p>
      <Button
        variant='outline'
        className='w-full'
        onClick={() => navigate('/signup')}
      >
        {t('offer.enterprise.cta')}
      </Button>
    </div>
  )
}

export default EnterpriseTab
