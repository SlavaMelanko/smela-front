import { CloudAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import useLocale from '@/hooks/useLocale'
import useUrlParams from '@/hooks/useUrlParams'
import { NetworkErrorType } from '@/lib/networkMonitor'

const Network = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const { errorType } = useUrlParams(['errorType'])

  const handleRetry = () => {
    navigate(-1)
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col items-center gap-4'>
        <CloudAlert className='mb-4 size-12 text-destructive' />

        <h1 className='text-2xl font-semibold'>{t('error.network.title')}</h1>

        <p className='text-center text-muted-foreground'>
          {t(`error.network.message.${errorType || NetworkErrorType.UNKNOWN}`)}
        </p>

        <Button className='mt-4 w-full' variant='outline' onClick={handleRetry}>
          {t('error.network.cta')}
        </Button>
      </div>
    </div>
  )
}

export default Network
