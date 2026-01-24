import { InfoIcon } from 'lucide-react'

import { Alert, AlertAction, AlertDescription } from '@/components/ui'

function Info({ text, className, children }) {
  return (
    <Alert variant='info' className={className}>
      <InfoIcon />
      <AlertDescription>{text}</AlertDescription>
      {children && <AlertAction>{children}</AlertAction>}
    </Alert>
  )
}

export { Info }
