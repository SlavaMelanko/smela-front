import { QueryClient } from '@tanstack/react-query'

const getRetryDelay = attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000) // max 30 seconds

const handleError = (error, context) => {
  console.error(`${context} error:`, error)

  // Here we could integrate with error tracking services like Sentry, Bugsnag, etc.
  // errorTracker.captureException(error, { context })

  // We could also show user-facing notifications
  // toast.error('Something went wrong. Please try again.')
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long until data is considered stale
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Cache time: how long data stays in cache after component unmounts
      gcTime: 10 * 60 * 1000, // 10 minutes
      // Retry failed requests
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }

        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      // Add exponential backoff delay
      retryDelay: getRetryDelay,
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: 'always',
      // Global query error handler
      onError: error => handleError(error, 'Query')
    },
    mutations: {
      // Retry failed mutations
      retry: false,
      // Improved error handler
      onError: error => handleError(error, 'Mutation')
    }
  }
})

if (import.meta.env.DEV) {
  // More aggressive refetching in development
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 0, // always consider data stale in dev
      refetchOnWindowFocus: true
    }
  })
}

export { queryClient }
