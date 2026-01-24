import { InfoIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const variants = {
  icon: 'text-foreground',
  text: 'text-foreground'
}

function Info({ text, className, children }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        className
      )}
    >
      <InfoIcon className={cn('size-8', variants.icon)} />
      <p className={cn('text-base', variants.text)}>{text}</p>
      {children}
    </div>
  )
}

export { Info }
