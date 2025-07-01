import { useState } from 'react'

import { EyeIcon, EyeOffIcon } from '@/components/icons'

import Input from '../Input'

const PasswordInput = props => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleIcon = showPassword ? <EyeOffIcon /> : <EyeIcon />

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
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
