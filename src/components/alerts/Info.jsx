import { InfoIcon } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui'

function Info({ text, className }) {
  return (
    <Alert variant='info' className={className}>
      <InfoIcon />
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  )
}

export { Info }
