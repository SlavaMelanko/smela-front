import './styles.scss'

import { GoogleIcon } from '@/components/icons'

export const PrimaryButton = ({ type = 'button', children, onClick }) => {
  return (
    <button type={type} className='primary-button' onClick={onClick}>
      {children}
    </button>
  )
}

export const GoogleLoginButton = () => {
  return (
    <button type='button' className='google-login-button'>
      <GoogleIcon className='google-login-button__icon' />
      <span className='google-login-button__text'>Continue with Google</span>
    </button>
  )
}
