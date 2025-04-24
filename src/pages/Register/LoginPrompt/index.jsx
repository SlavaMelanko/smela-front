import './styles.scss'

import { useTranslation } from 'react-i18next'

import InternalLink from '@/components/links/InternalLink'

const LoginPrompt = () => {
  const { t } = useTranslation()

  return (
    <div className='login-prompt'>
      {t('auth.haveAccount')}
      <InternalLink to='/login'>{t('auth.login')}</InternalLink>
    </div>
  )
}

export default LoginPrompt
