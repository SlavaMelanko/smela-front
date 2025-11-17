import { useEffect } from 'react'

import { useRefreshToken } from '@/hooks/useAuth'
import { accessTokenStorage } from '@/lib/storage'

export function AccessTokenProvider({ children }) {
  const { mutateAsync: refreshToken, isPending, isIdle } = useRefreshToken()
  const hasAccessToken = !!accessTokenStorage.get()

  useEffect(() => {
    // Only attempt refresh if there's no access token yet
    // (refresh token exists as httpOnly cookie)
    if (!hasAccessToken) {
      refreshToken().catch(() => {
        // Silently fail - user will see login page
      })
    }
  }, [hasAccessToken, refreshToken])

  // Render when: has token OR refresh completed (not idle and not pending)
  const isReady = hasAccessToken || (!isIdle && !isPending)

  if (!isReady) {
    return null
  }

  return children
}
