import { cn } from '@/lib/utils'

export const AuthDescription = ({ children, className }) => {
  return (
    <p className={cn('text-base text-muted-foreground', className)}>
      {children}
    </p>
  )
}
