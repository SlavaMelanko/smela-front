import './styles.scss'

import { GoogleIcon } from '@/components/icons'

const OAuthButton = ({ icon, text, onClick }) => {
  return (
    <button type='button' className='oauth-button' onClick={onClick}>
      {icon && <span className='oauth-button__icon'>{icon}</span>}
      <span className='oauth-button__text'>{text}</span>
    </button>
  )
}

const GoogleOAuthButton = ({ text, ...rest }) => (
  <OAuthButton icon={<GoogleIcon />} text={text} {...rest} />
)

export { GoogleOAuthButton }
