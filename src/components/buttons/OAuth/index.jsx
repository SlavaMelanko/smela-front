import './styles.scss'

import clsx from 'clsx'

import { GoogleIcon } from '@/components/icons'

const OAuthButton = ({ icon, text, className, ...reset }) => {
  return (
    <button
      type='button'
      className={clsx('oauth-button', className)}
      {...reset}
    >
      {icon && <span className='oauth-button__icon'>{icon}</span>}
      <span>{text}</span>
    </button>
  )
}

const GoogleOAuthButton = ({ text, ...rest }) => (
  <OAuthButton icon={<GoogleIcon />} text={text} {...rest} />
)

export { GoogleOAuthButton }
