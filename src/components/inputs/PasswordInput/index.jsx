import { useState } from 'react'

import { EyeIcon, EyeOffIcon } from '@/components/icons'

import Input from '../Input'

const PasswordInput = ({
  defaultVisible = false,
  toggleAriaLabel = 'Toggle password visibility',
  onVisibilityChange,
  disabled,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(defaultVisible)

  const handleToggle = () => {
    const newVisibility = !showPassword

    setShowPassword(newVisibility)
    onVisibilityChange?.(newVisibility)
  }

  const toggleIcon = showPassword ? <EyeOffIcon /> : <EyeIcon />
  const toggleLabel = showPassword ? 'Hide password' : 'Show password'

  return (
    <Input
      {...props}
      disabled={disabled}
      type={showPassword ? 'text' : 'password'}
      rightElement={
        <button
          type='button'
          onClick={handleToggle}
          className='input__toggle-btn'
          aria-label={toggleAriaLabel || toggleLabel}
          disabled={disabled && props.readOnly !== true}
        >
          {toggleIcon}
        </button>
      }
    />
  )
}

export default PasswordInput
