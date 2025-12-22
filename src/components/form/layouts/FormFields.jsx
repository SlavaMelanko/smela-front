import { cn } from '@/lib/utils'

export function FormFields({ children, className }) {
  return (
    <div className={cn('mb-8 flex flex-col gap-4', className)}>{children}</div>
  )
}
