import './styles.scss'

import { Link } from '@/components/ui/link'
import useLocale from '@/hooks/useLocale'

const LoginPrompt = ({ question }) => {
  const { t } = useLocale()

  return (
    <p className='login-prompt'>
      {question || t('alreadyHaveAccount')}{' '}
      <Link size='sm' to='/login'>
        {t('login.verb')}
      </Link>
    </p>
  )
}

export default LoginPrompt
