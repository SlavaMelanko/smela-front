import { cn } from '@/lib/utils'

export function FormContainer({ children, className, ...props }) {
  return (
    <form className={cn('flex flex-col', className)} {...props}>
      {children}
    </form>
  )
}
