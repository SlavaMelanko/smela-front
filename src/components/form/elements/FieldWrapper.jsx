import { cn } from '@/lib/utils'

export const FieldWrapper = ({ children, hasError, className }) => (
  <div className={cn('relative flex flex-col', hasError && 'mb-4', className)}>
    {children}
  </div>
)
