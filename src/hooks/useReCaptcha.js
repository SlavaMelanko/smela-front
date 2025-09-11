import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const useReCaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const executeReCaptcha = async (action = 'submit') => {
    if (!executeRecaptcha) {
      console.warn('ReCaptcha not ready.')

      return null
    }

    try {
      const token = await executeRecaptcha(action)

      return token
    } catch (error) {
      console.error('ReCaptcha execution failed:', error)

      return null
    }
  }

  return {
    executeReCaptcha,
    isReady: !!executeRecaptcha
  }
}

export default useReCaptcha
