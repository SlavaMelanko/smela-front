import InternalLink from '@/components/links/InternalLink'

const LoginPrompt = () => {
  return (
    <p className='login-prompt'>
      Already have an account? <InternalLink to='/login'>Log in</InternalLink>
    </p>
  )
}

export default LoginPrompt
