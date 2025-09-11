import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import useLocale from '@/hooks/useLocale'
import env from '@/lib/env'

const ReCaptchaProvider = ({ children }) => {
  const { locale } = useLocale()

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={env.CAPTCHA_SITE_KEY}
      language={locale}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}

export { ReCaptchaProvider }
