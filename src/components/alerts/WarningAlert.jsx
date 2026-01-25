import { TriangleAlertIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const variants = {
  icon: 'text-amber-500',
  text: 'text-amber-500'
}

const WarningAlert = ({ text, className, children }) => (
  <div
    className={cn('flex flex-col items-center justify-center gap-4', className)}
  >
    <TriangleAlertIcon className={cn('size-8', variants.icon)} />
    <p className={cn('text-base', variants.text)}>{text}</p>
    {children}
  </div>
)

export { WarningAlert }
