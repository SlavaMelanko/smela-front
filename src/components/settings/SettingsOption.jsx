import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

export const SettingsOption = ({ selected, onClick, label, description }) => (
  <button
    onClick={onClick}
    className={cn(
      'group relative flex min-w-60 flex-1 cursor-pointer flex-col items-center gap-1 rounded-lg border px-4 py-4 transition-all duration-200',
      selected
        ? 'border-primary bg-primary/5'
        : 'border-border bg-card hover:border-muted-foreground/30 hover:bg-accent/50'
    )}
  >
    <span className='text-lg font-normal tracking-tight text-foreground'>
      {label}
    </span>
    {description && (
      <span className='text-xs text-muted-foreground'>{description}</span>
    )}
    {selected && (
      <div className='absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground'>
        <Check className='size-3' />
      </div>
    )}
  </button>
)
