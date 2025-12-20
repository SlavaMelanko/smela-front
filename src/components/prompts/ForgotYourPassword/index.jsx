import './styles.scss'

import { Link } from '@/components/ui/link'
import useLocale from '@/hooks/useLocale'

const ForgotYourPasswordPrompt = () => {
  const { t } = useLocale()

  return (
    <p className='forgot-your-password-prompt'>
      <Link to='/reset-password' size='sm'>
        {t('forgotYourPassword')}
      </Link>
    </p>
  )
}

export default ForgotYourPasswordPrompt
