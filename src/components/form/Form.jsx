import { cn } from '@/lib/utils'

export const FormRoot = ({ children, className, ...props }) => (
  <form className={cn('flex flex-col gap-8', className)} {...props}>
    {children}
  </form>
)

export const FormGroup = ({ children, className, legend }) => (
  <fieldset className={cn('rounded-lg border border-border p-4', className)}>
    {legend && (
      <legend className='-mx-2 px-2 text-sm font-medium text-muted-foreground'>
        {legend}
      </legend>
    )}
    {children}
  </fieldset>
)

export const FormRow = ({ children, className }) => (
  <div className={cn('grid grid-cols-2 gap-x-6 gap-y-4', className)}>
    {children}
  </div>
)

export const FormFields = ({ children, className }) => (
  <div className={cn('flex flex-col gap-4', className)}>{children}</div>
)

export const FormLabel = ({ htmlFor, children, optional, className }) => (
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

export const FormFieldWrapper = ({ children, hasError, className }) => (
  <div className={cn('relative flex flex-col', hasError && 'mb-4', className)}>
    {children}
  </div>
)

export const FormInputWrapper = ({ children }) => (
  <div className='flex w-full flex-col'>{children}</div>
)

export const FormError = ({ message, className }) => (
  <div
    className={cn(
      'absolute top-full overflow-hidden whitespace-nowrap text-sm text-destructive transition-all duration-200',
      message ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
      className
    )}
    role={message ? 'alert' : undefined}
    aria-live='polite'
  >
    {message}
  </div>
)
