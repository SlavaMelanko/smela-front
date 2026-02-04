import { AlertCircle, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { StateIcon, StateRoot, StateTitle } from './State'

const RetryButton = ({ onClick }) => {
  const { t } = useLocale()

  return (
    <Button variant='outline' onClick={onClick}>
      <RefreshCw className='size-4' />
      <span>{t('tryAgain')}</span>
    </Button>
  )
}

export const ErrorState = ({ text, className, centered = true, onRetry }) => {
  const handleRetry = onRetry ?? (() => window.location.reload())

  return (
    <StateRoot className={className} centered={centered}>
      <StateIcon icon={AlertCircle} className='text-destructive' />
      <StateTitle className='text-destructive'>{text}</StateTitle>
      <RetryButton onClick={handleRetry} />
    </StateRoot>
  )
}
