import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'

import { getNetworkErrorType, isNetworkError } from '@/lib/network-monitor'

const getRetryDelay = attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000) // max 30 seconds

const handleError = error => {
  if (isNetworkError(error)) {
    if (!window.location.pathname.includes('/errors/network')) {
      const errorType = getNetworkErrorType(error)

      window.location.href = `/errors/network?type=${errorType}`
    }

    return
  }

  // Here we could integrate with error tracking services like Sentry, Bugsnag, etc.
  // errorTracker.captureException(error, { context }).

  // We could also show user-facing notifications.
  // toast.error('Something went wrong. Please try again.').
}

const queryCache = new QueryCache({
  onError: handleError
})

const mutationCache = new MutationCache({
  onError: handleError,
  onSettled: (_data, _error, _variables, _context, mutation) => {
    const invalidatesQueries = mutation.meta?.invalidatesQueries
    const refetchType = mutation.meta?.refetchType

    // Only invalidate queries if refetchType is not 'none'.
    if (invalidatesQueries && refetchType !== 'none') {
      queryClient.invalidateQueries({ queryKey: invalidatesQueries })
    }
  }
})

const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      // Stale time: how long until data is considered stale.
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Cache time: how long data stays in cache after component unmounts.
      gcTime: 10 * 60 * 1000, // 10 minutes
      // Retry failed requests.
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors).
        if (
          error?.status >= StatusCodes.BAD_REQUEST &&
          error?.status < StatusCodes.INTERNAL_SERVER_ERROR
        ) {
          return false
        }

        // Retry up to 2 times for other errors.
        return failureCount < 2
      },
      // Add exponential backoff delay.
      retryDelay: getRetryDelay,
      // Refetch on window focus.
      refetchOnWindowFocus: false,
      // Refetch on reconnect.
      refetchOnReconnect: 'always'
    },
    mutations: {
      // Retry failed mutations.
      retry: false
    }
  }
})

export { queryClient }
