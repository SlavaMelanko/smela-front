import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { OfferButton } from '@/components/buttons'
import useLocale from '@/hooks/useLocale'

const EnterpriseTab = () => {
  const { t } = useLocale()
  const navigate = useNavigate()

  return (
    <div className='enterprise-tab'>
      <p className='enterprise-tab__text'>{t('offer.enterprise.msg')}</p>
      <OfferButton
        className='enterprise-tab__contact-us'
        variant='outlined'
        onClick={() => navigate('/signup')}
      >
        {t('offer.enterprise.cta')}
      </OfferButton>
    </div>
  )
}

export default EnterpriseTab
