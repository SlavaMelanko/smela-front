import './styles.scss'

import InternalLink from '@/components/links/InternalLink'
import useLocale from '@/hooks/useLocale'

const SignupPrompt = () => {
  const { t } = useLocale()

  return (
    <p className='signup-prompt'>
      {t('doNotHaveAccount')}{' '}
      <InternalLink size='sm' to='/pricing'>
        {t('signUp')}
      </InternalLink>
    </p>
  )
}

export default SignupPrompt
