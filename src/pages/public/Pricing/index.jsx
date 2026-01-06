import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import EnterpriseTab from './components/EnterpriseTab'
import StandardCards from './components/StandardCards'

const TabId = Object.freeze({
  STANDARD: 'standard',
  ENTERPRISE: 'enterprise'
})

const Pricing = () => {
  const { t } = useLocale({ keyPrefix: 'offer' })

  return (
    <div>
      <h1 className='mb-4 text-center text-4xl font-bold text-foreground'>
        {t('title')}
      </h1>
      <p className='mb-8 text-center text-lg text-muted-foreground'>
        {t('subtitle')}
      </p>

      <Tabs defaultValue={TabId.STANDARD} className='gap-6 items-center'>
        <TabsList>
          <TabsTrigger value={TabId.STANDARD}>{t('type.standard')}</TabsTrigger>
          <TabsTrigger value={TabId.ENTERPRISE}>
            {t('type.enterprise')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TabId.STANDARD}>
          <div className='flex min-h-[460px] items-center justify-center rounded-lg bg-background'>
            <StandardCards />
          </div>
        </TabsContent>
        <TabsContent value={TabId.ENTERPRISE}>
          <div className='flex min-h-[460px] items-center justify-center rounded-lg bg-background'>
            <EnterpriseTab />
          </div>
        </TabsContent>
      </Tabs>

      <p className='mt-10 text-center text-sm text-muted-foreground'>
        {t('note')}
      </p>
    </div>
  )
}

export default Pricing
