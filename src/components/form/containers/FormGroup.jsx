import { cn } from '@/lib/utils'

export const FormGroup = ({ children, className, legend }) => (
  <fieldset className={cn('border border-border rounded-lg p-4', className)}>
    {legend && (
      <legend className='-mx-2 px-2 text-sm font-medium text-muted-foreground'>
        {legend}
      </legend>
    )}
    {children}
  </fieldset>
)
