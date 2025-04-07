import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

import Input from '../Input'

const PasswordInput = ({ value, onChange, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleIcon = showPassword ? (
    <EyeOff className='input__toggle-icon' />
  ) : (
    <Eye className='input__toggle-icon' />
  )

  return (
    <Input
      {...rest}
      type={showPassword ? 'text' : 'password'}
      placeholder='••••••••'
      value={value}
      onChange={onChange}
      rightElement={
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='input__toggle-btn'
        >
          {toggleIcon}
        </button>
      }
    />
  )
}

export default PasswordInput
