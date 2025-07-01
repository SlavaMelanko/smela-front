import './styles.scss'

import InternalLink from '@/components/links/InternalLink'
import useLocale from '@/hooks/useLocale'

const ForgotYourPasswordPrompt = () => {
  const { t } = useLocale()

  return (
    <p className='forgot-your-password-prompt'>
      <InternalLink to='/reset-password' size='sm'>
        {t('forgotYourPassword')}
      </InternalLink>
    </p>
  )
}

export default ForgotYourPasswordPrompt
