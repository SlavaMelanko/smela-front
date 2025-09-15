import './styles.scss'

import InternalLink from '@/components/links/InternalLink'
import useLocale from '@/hooks/useLocale'

const LoginPrompt = ({ question }) => {
  const { t } = useLocale()

  return (
    <p className='login-prompt'>
      {question || t('alreadyHaveAccount')}{' '}
      <InternalLink size='sm' to='/login'>
        {t('login.verb')}
      </InternalLink>
    </p>
  )
}

export default LoginPrompt
