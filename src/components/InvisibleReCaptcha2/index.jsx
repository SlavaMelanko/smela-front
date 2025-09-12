import { forwardRef, useImperativeHandle, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import useLocale from '@/hooks/useLocale'
import useTheme from '@/hooks/useTheme'
import env from '@/lib/env'

// https://www.google.com/recaptcha/admin/site/734411735
const InvisibleReCaptcha2 = forwardRef((props, ref) => {
  const { theme } = useTheme()
  const { locale } = useLocale()
  const recaptchaRef = useRef(null)

  useImperativeHandle(ref, () => ({
    executeAsync: async () => {
      const recaptcha = recaptchaRef.current

      if (!recaptcha) {
        console.warn('ReCaptcha not ready.')

        return null
      }

      // Create timeout mechanism
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      try {
        recaptcha.reset()

        // Race between reCAPTCHA execution and timeout
        const result = await Promise.race([
          recaptcha.executeAsync(),
          new Promise((_, reject) => {
            controller.signal.addEventListener('abort', () =>
              reject(new Error('reCAPTCHA timeout'))
            )
          })
        ])

        clearTimeout(timeoutId)

        return result
      } catch (error) {
        clearTimeout(timeoutId)

        if (error.message === 'reCAPTCHA timeout') {
          console.warn('reCAPTCHA execution timed out after 10 seconds')
        } else {
          console.error('ReCaptcha execution failed:', error)
        }

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
