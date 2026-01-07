import { cn } from '@/lib/utils'

export const FormFields = ({ children, className }) => (
  <div className={cn('flex flex-col gap-4', className)}>{children}</div>
)
