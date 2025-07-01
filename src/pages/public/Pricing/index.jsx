import './styles.scss'

import Tabs from '@/components/Tabs'
import useLocale from '@/hooks/useLocale'

import EnterpriseTab from './EnterpriseTab'
import StandardCards from './StandardCards'

const TabId = Object.freeze({
  STANDARD: 'standard',
  ENTERPRISE: 'enterprise'
})

const Pricing = () => {
  const { t } = useLocale({ keyPrefix: 'offer' })

  const tabs = [
    {
      value: TabId.STANDARD,
      label: t('type.standard'),
      children: (
        <div className='pricing-page__content'>
          <StandardCards />
        </div>
      )
    },
    {
      value: TabId.ENTERPRISE,
      label: t('type.enterprise'),
      children: (
        <div className='pricing-page__content'>
          <EnterpriseTab />
        </div>
      )
    }
  ]

  return (
    <div className='pricing-page'>
      <h1 className='pricing-page__title'>{t('title')}</h1>
      <p className='pricing-page__subtitle'>{t('subtitle')}</p>

      <Tabs defaultValue={TabId.STANDARD} tabs={tabs} />

      <p className='pricing-page__footer'>{t('note')}</p>
    </div>
  )
}

export default Pricing
