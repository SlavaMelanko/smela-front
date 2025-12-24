import './styles.scss'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useLocale from '@/hooks/useLocale'

import EnterpriseTab from './EnterpriseTab'
import StandardCards from './StandardCards'

const TabId = Object.freeze({
  STANDARD: 'standard',
  ENTERPRISE: 'enterprise'
})

const Pricing = () => {
  const { t } = useLocale({ keyPrefix: 'offer' })

  return (
    <div className='pricing-page'>
      <h1 className='pricing-page__title'>{t('title')}</h1>
      <p className='pricing-page__subtitle'>{t('subtitle')}</p>

      <Tabs defaultValue={TabId.STANDARD} className='items-center'>
        <TabsList>
          <TabsTrigger value={TabId.STANDARD}>{t('type.standard')}</TabsTrigger>
          <TabsTrigger value={TabId.ENTERPRISE}>
            {t('type.enterprise')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TabId.STANDARD}>
          <div className='pricing-page__content'>
            <StandardCards />
          </div>
        </TabsContent>
        <TabsContent value={TabId.ENTERPRISE}>
          <div className='pricing-page__content'>
            <EnterpriseTab />
          </div>
        </TabsContent>
      </Tabs>

      <p className='pricing-page__footer'>{t('note')}</p>
    </div>
  )
}

export default Pricing
