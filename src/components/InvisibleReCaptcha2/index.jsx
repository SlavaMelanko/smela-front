import { forwardRef, useImperativeHandle, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import useLocale from '@/hooks/useLocale'
import useTheme from '@/hooks/useTheme'
import { withTimeout } from '@/lib/async'
import env from '@/lib/env'

// reCAPTCHA settings: https://www.google.com/recaptcha/admin/site/734411735
const InvisibleReCaptcha2 = forwardRef((props, ref) => {
  const { theme } = useTheme()
  const { locale } = useLocale()
  const recaptchaRef = useRef(null)

  useImperativeHandle(ref, () => ({
    executeAsync: async () => {
      const recaptcha = recaptchaRef.current

      if (!recaptcha) {
        console.warn('reCAPTCHA not ready.')

        return null
      }

      try {
        recaptcha.reset()

        return await withTimeout(() => recaptcha.executeAsync())
      } catch (error) {
        console.error('reCAPTCHA error:', error?.message || 'Unknown.')

        return null
      }
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
