import { cn } from '@/lib/utils'

export const FormRow = ({ children, className }) => (
  <div className={cn('grid grid-cols-2 gap-x-6 gap-y-4', className)}>
    {children}
  </div>
)
