import { forwardRef, useImperativeHandle, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import env from '@/lib/env'

const InvisibleReCaptcha2 = forwardRef((props, ref) => {
  const recaptchaRef = useRef(null)

  useImperativeHandle(ref, () => ({
    executeAsync: async () => {
      const recaptcha = recaptchaRef.current

      if (!recaptcha) {
        console.warn('ReCaptcha not ready.')

        return null
      }

      try {
        recaptcha.reset()

        return recaptcha.executeAsync()
      } catch (error) {
        console.error('ReCaptcha execution failed:', error)

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
      ref={recaptchaRef}
      sitekey={env.CAPTCHA_SITE_KEY}
      size='invisible'
      {...props}
    />
  )
})

InvisibleReCaptcha2.displayName = 'InvisibleReCaptcha2'

export default InvisibleReCaptcha2
