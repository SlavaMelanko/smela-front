import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import Input from '../Input'

const PasswordInput = props => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleIcon = showPassword ? (
    <EyeOff className='input__toggle-icon' />
  ) : (
    <Eye className='input__toggle-icon' />
  )

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      placeholder='••••••••'
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
