import { cn } from '@/lib/utils'

export const FormContainer = ({ children, className, ...props }) => (
  <form className={cn('flex flex-col gap-8', className)} {...props}>
    {children}
  </form>
)
