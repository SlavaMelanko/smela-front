import { cn } from '@/lib/utils'

export const ActiveIndicator = ({ isActive, className }) => (
  <div
    className={cn(
      '-ml-2 w-1 shrink-0 rounded-full bg-primary transition-opacity',
      isActive ? 'opacity-100' : 'opacity-0',
      className
    )}
  />
)
