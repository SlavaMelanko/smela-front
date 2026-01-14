import { cn } from '@/lib/utils'

export const PageContent = ({ children, className }) => (
  <div className={cn('flex w-full flex-col gap-12', className)}>{children}</div>
)
