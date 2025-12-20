import './styles.scss'

import { Link } from '@/components/ui/link'
import useLocale from '@/hooks/useLocale'

const SignupPrompt = () => {
  const { t } = useLocale()

  return (
    <p className='signup-prompt'>
      {t('doNotHaveAccount')}{' '}
      <Link size='sm' to='/pricing'>
        {t('signUp')}
      </Link>
    </p>
  )
}

export default SignupPrompt
