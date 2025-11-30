import { useRef } from 'react'

import InvisibleReCaptcha2 from '@/components/InvisibleReCaptcha2'

const useCaptcha = () => {
  const ref = useRef(null)

  const getToken = async () => {
    try {
      const token = await ref.current?.executeAsync()

      if (!token) {
        console.error('Captcha error: token is empty')
      }

      return token
    } catch (error) {
      console.error('Captcha error:', error.message)

      return null
    }
  }

  const Captcha = <InvisibleReCaptcha2 ref={ref} />

  return { getToken, Captcha }
}

export default useCaptcha
