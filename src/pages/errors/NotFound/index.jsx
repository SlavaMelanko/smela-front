import { SearchX } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import useLocale from '@/hooks/useLocale'
import { captureMessage } from '@/services/errorTracker'

const NotFound = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    captureMessage(`404 Not Found: ${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col items-center gap-4'>
        <SearchX className='mb-4 size-12 text-destructive' />

        <h1 className='text-2xl font-semibold'>{t('error.notFound.title')}</h1>

        <p className='text-center text-muted-foreground'>
          {t('error.notFound.message')}
        </p>

        <Button
          className='mt-4 w-full'
          variant='outline'
          onClick={handleGoHome}
        >
          {t('error.notFound.cta')}
        </Button>
      </div>
    </div>
  )
}

export default NotFound
