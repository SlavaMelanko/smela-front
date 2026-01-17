import { cn } from '@/lib/utils'

export const Description = ({ children, className }) => {
  return (
    <p className={cn('text-base text-muted-foreground', className)}>
      {children}
    </p>
  )
}
