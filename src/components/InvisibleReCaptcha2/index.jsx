import { forwardRef, useImperativeHandle, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import useLocale from '@/hooks/useLocale'
import useTheme from '@/hooks/useTheme'
import { withTimeout } from '@/lib/async'
import env from '@/lib/env'

const isReCaptchaScriptReady = () => {
  return window.grecaptcha && window.grecaptcha.ready
}

// reCAPTCHA settings: https://www.google.com/recaptcha/admin/site/734411735
const InvisibleReCaptcha2 = forwardRef((props, ref) => {
  const { theme } = useTheme()
  const { locale } = useLocale()
  const recaptchaRef = useRef(null)

  useImperativeHandle(ref, () => ({
    executeAsync: async () => {
      let token = ''

      if (!isReCaptchaScriptReady()) {
        console.warn('reCAPTCHA script not loaded yet.')

        return token
      }

      const recaptcha = recaptchaRef.current

      if (!recaptcha) {
        console.warn('reCAPTCHA component not ready yet.')

        return token
      }

      try {
        recaptcha.reset()
        token = await withTimeout(() => recaptcha.executeAsync())
      } catch (error) {
        console.error('reCAPTCHA error:', error?.message || 'Unknown.')
      }

      return token
    },
    reset: () => {
      const recaptcha = recaptchaRef.current

      if (recaptcha) {
        recaptcha.reset()
      }
    }
  }))

  return (
    <ReCAPTCHA
      key={`recaptcha-${theme}-${locale}`}
      ref={recaptchaRef}
      sitekey={env.CAPTCHA_SITE_KEY}
      size='invisible'
      theme={theme}
      hl={locale}
      {...props}
    />
  )
})

InvisibleReCaptcha2.displayName = 'InvisibleReCaptcha2'

export default InvisibleReCaptcha2
