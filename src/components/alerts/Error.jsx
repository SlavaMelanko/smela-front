import { CircleXIcon } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui'

function Error({ text, className }) {
  return (
    <Alert variant='destructive' className={className}>
      <CircleXIcon />
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  )
}

export { Error }
