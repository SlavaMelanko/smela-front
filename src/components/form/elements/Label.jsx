import { cn } from '@/lib/utils'

export const Label = ({ htmlFor, children, optional, className }) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      'block cursor-pointer text-base leading-normal text-muted-foreground',
      className
    )}
  >
    {children}
    {!optional && <span className='ml-1 text-destructive'>*</span>}
  </label>
)
