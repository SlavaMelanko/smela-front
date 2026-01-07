import { cn } from '@/lib/utils'

const Label = ({ htmlFor, children, optional, className }) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      'block text-base font-medium leading-normal text-foreground',
      className
    )}
  >
    {children}
    {!optional && <span className='ml-1 text-destructive'>*</span>}
  </label>
)

export default Label
