import { TriangleAlertIcon } from 'lucide-react'

import { Alert, AlertAction, AlertDescription } from '@/components/ui'

function Warning({ text, className, children }) {
  return (
    <Alert variant='warning' className={className}>
      <TriangleAlertIcon />
      <AlertDescription>{text}</AlertDescription>
      {children && <AlertAction>{children}</AlertAction>}
    </Alert>
  )
}

export { Warning }
