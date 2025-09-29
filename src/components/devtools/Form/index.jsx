import { lazy, Suspense } from 'react'

// Lazy load React Hook Form DevTools only in development
const DevTool = import.meta.env.DEV
  ? lazy(() =>
      import('@hookform/devtools').then(module => ({
        default: module.DevTool
      }))
    )
  : () => null

/**
 * FormDevTools Component
 *
 * Provides React Hook Form DevTools in development mode.
 * Automatically hidden in production builds.
 *
 * Usage:
 * ```jsx
 * import FormDevTools from '@/components/devtools/Form'
 *
 * const MyForm = () => {
 *   const methods = useForm()
 *
 *   return (
 *     <>
 *       <form>...</form>
 *       <FormDevTools control={methods.control} />
 *     </>
 *   )
 * }
 * ```
 */
const FormDevTools = ({ control }) => {
  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <DevTool control={control} />
    </Suspense>
  )
}

export default FormDevTools
