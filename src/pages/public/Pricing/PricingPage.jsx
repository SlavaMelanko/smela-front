import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import EnterpriseTab from './EnterpriseTab'
import { PricingFaq } from './PricingFaq'
import StandardCards from './StandardCards'

const TabId = Object.freeze({
  STANDARD: 'standard',
  ENTERPRISE: 'enterprise'
})

export const PricingPage = () => {
  const { t } = useLocale({ keyPrefix: 'offer' })

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col items-center gap-4 text-center md:gap-5 lg:gap-6'>
        <h1 className='text-4xl font-bold text-foreground'>{t('title')}</h1>
        <p className='text-lg text-muted-foreground'>{t('subtitle')}</p>
      </div>

      <Tabs defaultValue={TabId.STANDARD} className='items-center gap-8'>
        <TabsList>
          <TabsTrigger value={TabId.STANDARD}>{t('type.standard')}</TabsTrigger>
          <TabsTrigger value={TabId.ENTERPRISE}>
            {t('type.enterprise')}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={TabId.STANDARD}
          className='flex min-h-115 items-center justify-center rounded-lg bg-background px-4'
        >
          <StandardCards />
        </TabsContent>
        <TabsContent
          value={TabId.ENTERPRISE}
          className='flex min-h-115 items-center justify-center rounded-lg bg-background px-4'
        >
          <EnterpriseTab />
        </TabsContent>
      </Tabs>

      <PricingFaq />
    </div>
  )
}
