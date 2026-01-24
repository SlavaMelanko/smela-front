import { CircleXIcon } from 'lucide-react'

import { Alert, AlertAction, AlertDescription } from '@/components/ui'

function Error({ text, className, children }) {
  return (
    <Alert variant='destructive' className={className}>
      <CircleXIcon />
      <AlertDescription>{text}</AlertDescription>
      {children && <AlertAction>{children}</AlertAction>}
    </Alert>
  )
}

export { Error }
