import { lazy, Suspense } from 'react'

// Lazy load TanStack Query DevTools only in development
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then(module => ({
        default: module.ReactQueryDevtools
      }))
    )
  : () => null

// Future: Add TanStack Router DevTools when migrating from react-router-dom
// const TanStackRouterDevtools = import.meta.env.DEV
//   ? lazy(() =>
//       import('@tanstack/router-devtools').then(module => ({
//         default: module.TanStackRouterDevtools
//       }))
//     )
//   : () => null

// Future: Add TanStack Table DevTools if needed
// const ReactTableDevtools = import.meta.env.DEV
//   ? lazy(() =>
//       import('@tanstack/react-table-devtools').then(module => ({
//         default: module.ReactTableDevtools
//       }))
//     )
//   : () => null

/**
 * TanStackDevTools Component
 *
 * Unified DevTools for all TanStack libraries.
 * Currently includes:
 * - React Query DevTools
 *
 * Future additions:
 * - TanStack Router DevTools (when migrating from react-router-dom)
 * - TanStack Table DevTools (if needed)
 *
 * Usage:
 * ```jsx
 * import TanStackDevTools from '@/components/devtools/TanStack'
 *
 * // Inside your app providers
 * <QueryClientProvider client={queryClient}>
 *   {children}
 *   <TanStackDevTools />
 * </QueryClientProvider>
 * ```
 */
const TanStackDevTools = ({ position = 'bottom-left' }) => {
  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <>
      {/* React Query DevTools */}
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition={position} />
      </Suspense>

      {/* Future: TanStack Router DevTools */}
      {/* <Suspense fallback={null}>
        <TanStackRouterDevtools initialIsOpen={false} />
      </Suspense> */}

      {/* Future: TanStack Table DevTools */}
      {/* <Suspense fallback={null}>
        <ReactTableDevtools initialIsOpen={false} />
      </Suspense> */}
    </>
  )
}

export default TanStackDevTools
