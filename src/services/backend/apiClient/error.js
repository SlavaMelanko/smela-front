import { HttpStatus } from '@/lib/httpStatus'

const createError = async response => {
  const errorData = await response.json().catch(() => ({}))

  const error = new Error(
    errorData.error || `Request failed with status ${response.status}`
  )

  error.name = errorData.name || 'AppError'
  error.code = errorData.code || 'system:internal-error'
  error.status = response.status || HttpStatus.INTERNAL_SERVER_ERROR

  return error
}

export { createError }
