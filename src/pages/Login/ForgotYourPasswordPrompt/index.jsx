import './styles.scss'

import InternalLink from '@/components/links/InternalLink'

const ForgotYourPasswordPrompt = () => {
  return (
    <p className='forgot-your-password-prompt'>
      <InternalLink to='/forgot-password' size='sm'>
        Forgot your password?
      </InternalLink>
    </p>
  )
}

export default ForgotYourPasswordPrompt
