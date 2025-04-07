import './styles.scss'

import InternalLink from '@/components/links/InternalLink'

const SignupPrompt = () => {
  return (
    <p className='signup-prompt'>
      Don&apos;t have an account?{' '}
      <InternalLink to='/pricing'>Sign up</InternalLink>
    </p>
  )
}

export default SignupPrompt
