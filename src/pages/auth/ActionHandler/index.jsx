import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { withQuery } from '@/lib/url'

export const ActionHandler = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const mode = params.get('mode')
  const oobCode = params.get('oobCode')

  useEffect(() => {
    const routes = {
      resetPassword: withQuery('/reset-password', { oobCode }),
      verifyEmail: withQuery('/verify-email', { oobCode })
    }
    const target = mode && oobCode ? routes[mode] : '/'

    navigate(target)
  }, [mode, oobCode, navigate])

  return null
}
