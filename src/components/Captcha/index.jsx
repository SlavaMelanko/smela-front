import './styles.scss'

import HCaptcha from '@hcaptcha/react-hcaptcha'
import clsx from 'clsx'

import useLocale from '@/hooks/useLocale'
import useTheme from '@/hooks/useTheme'
import env from '@/lib/env'

const Captcha = ({ setToken, error }) => {
  const { theme } = useTheme()
  const { locale } = useLocale()

  return (
    <div
      className={clsx('captcha-container', {
        'captcha-container--error': !!error
      })}
    >
      <HCaptcha
        sitekey={env.HCAPTCHA_SITEKEY}
        onVerify={token => setToken(token)}
        onError={() => setToken('')}
        onExpire={() => setToken('')}
        languageOverride={locale}
        theme={theme}
      />
    </div>
  )
}

export default Captcha
