import { TriangleAlertIcon } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui'

function Warning({ text, className }) {
  return (
    <Alert variant='warning' className={className}>
      <TriangleAlertIcon />
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  )
}

export { Warning }
