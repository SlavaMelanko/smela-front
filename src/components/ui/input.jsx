import { Input as InputPrimitive } from '@base-ui/react/input'
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'w-full rounded-md border border-border bg-background px-4 py-3 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-[1px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      state: {
        default: '',
        error:
          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20'
      }
    },
    defaultVariants: {
      state: 'default'
    }
  }
)

const Input = forwardRef(
  (
    {
      type = 'text',
      autoComplete = 'off',
      className,
      leftIcon,
      rightIcon,
      error,
      ...props
    },
    ref
  ) => {
    const state = error ? 'error' : 'default'

    return (
      <div className='relative'>
        {leftIcon && (
          <div className='absolute left-4 top-1/2 flex -translate-y-1/2 items-center'>
            {leftIcon}
          </div>
        )}
        <InputPrimitive
          ref={ref}
          type={type}
          autoComplete={autoComplete}
          className={cn(
            inputVariants({ state }),
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className='absolute right-4 top-1/2 flex -translate-y-1/2 items-center'>
            {rightIcon}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
