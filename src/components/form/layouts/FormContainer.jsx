import { cn } from '@/lib/utils'

export function FormContainer({ children, className, ...props }) {
  return (
    <form className={cn('flex flex-col gap-8', className)} {...props}>
      {children}
    </form>
  )
}
