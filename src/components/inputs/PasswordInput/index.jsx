import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Input } from '@/components/ui/input'

const PasswordInput = forwardRef(
  (
    {
      defaultVisible = false,
      toggleAriaLabel = 'Toggle password visibility',
      onVisibilityChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(defaultVisible)

    const handleToggle = () => {
      const newVisibility = !showPassword

      setShowPassword(newVisibility)
      onVisibilityChange?.(newVisibility)
    }

    const Icon = showPassword ? EyeOff : Eye
    const toggleLabel = showPassword ? 'Hide password' : 'Show password'

    return (
      <Input
        ref={ref}
        {...props}
        disabled={disabled}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          <button
            type='button'
            onClick={handleToggle}
            className='flex h-full cursor-pointer items-center border-none bg-transparent p-0'
            aria-label={toggleAriaLabel || toggleLabel}
            disabled={disabled && props.readOnly !== true}
          >
            <Icon className='size-6 text-muted-foreground' />
          </button>
        }
      />
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
