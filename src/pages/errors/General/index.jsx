import { ServerCrash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import useLocale from '@/hooks/useLocale'

const General = () => {
  const { t } = useLocale()
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col items-center gap-4'>
        <ServerCrash className='mb-4 size-12 text-destructive' />

        <h1 className='text-2xl font-semibold'>{t('error.general.title')}</h1>

        <p className='text-center text-muted-foreground'>
          {t('error.general.message')}
        </p>

        <Button
          className='mt-4 w-full'
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
