import { ChevronLeft, CircleXIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui'
import useLocale from '@/hooks/useLocale'
import { cn } from '@/lib/utils'

const variants = {
  icon: 'text-destructive',
  text: 'text-destructive'
}

function Error({ text, className, children }) {
  const navigate = useNavigate()
  const { t } = useLocale()

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        className
      )}
    >
      <CircleXIcon className={cn('size-8', variants.icon)} />
      <p className={cn('text-base', variants.text)}>{text}</p>
      {children ?? (
        <Button variant='outline' onClick={() => navigate(-1)}>
          <ChevronLeft className='size-5' />
          {t('back')}
        </Button>
      )}
    </div>
  )
}

export { Error }
