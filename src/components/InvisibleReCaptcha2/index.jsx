import { forwardRef, useImperativeHandle, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import useLocale from '@/hooks/useLocale'
import useTheme from '@/hooks/useTheme'
import env from '@/lib/env'

/**
 * Wraps an async function with a timeout mechanism
 * @param {Function} asyncFn - The async function to execute
 * @param {number} timeoutMs - Timeout in milliseconds (default: 10000)
 * @returns {Promise} - Promise that resolves with the function result or rejects on timeout
 */
const withTimeout = async (asyncFn, timeoutMs = 10000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const result = await Promise.race([
      asyncFn(),
      new Promise((_, reject) => {
        controller.signal.addEventListener('abort', () =>
          reject(new Error('Timeout.'))
        )
      })
    ])

    return result
  } finally {
    clearTimeout(timeoutId)
  }
}

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
