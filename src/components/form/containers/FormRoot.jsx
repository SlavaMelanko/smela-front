import { cn } from '@/lib/utils'

export const FormRoot = ({ children, className, ...props }) => (
  <form className={cn('flex flex-col gap-8', className)} {...props}>
    {children}
  </form>
)
