import './styles.scss'

import { useTranslation } from 'react-i18next'

import InternalLink from '@/components/links/InternalLink'

const SignupPrompt = () => {
  const { t } = useTranslation()

  return (
    <p className='signup-prompt'>
      {t('auth.dontHaveAccount')}{' '}
      <InternalLink to='/pricing'>{t('auth.signUp')}</InternalLink>
    </p>
  )
}

export default SignupPrompt
