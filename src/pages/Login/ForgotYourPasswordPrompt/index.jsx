import './styles.scss'

import { useTranslation } from 'react-i18next'

import InternalLink from '@/components/links/InternalLink'

const ForgotYourPasswordPrompt = () => {
  const { t } = useTranslation()

  return (
    <p className='forgot-your-password-prompt'>
      <InternalLink to='/forgot-password' size='sm'>
        {t('auth.forgotPassword')}
      </InternalLink>
    </p>
  )
}

export default ForgotYourPasswordPrompt
