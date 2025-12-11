import { useSearchParams } from 'react-router-dom'

const DEFAULT_LIMIT = 25

const useUsersTableParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read: parse URL into structured state
  const params = {
    roles: searchParams.get('roles')?.split(',').filter(Boolean) || [],
    statuses: searchParams.get('statuses')?.split(',').filter(Boolean) || [],
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || DEFAULT_LIMIT
  }

  // Write: update URL with new values
  const setParams = (updates, options = {}) => {
    const { resetPage = false } = options

    setSearchParams(prev => {
      const next = new URLSearchParams(prev)

      Object.entries(updates).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Arrays → comma-separated or remove if empty
          if (value.length > 0) {
            next.set(key, value.join(','))
          } else {
            next.delete(key)
          }
        } else if (value === null || value === undefined || value === '') {
          next.delete(key)
        } else {
          next.set(key, String(value))
        }
      })

      // Reset page to 1 when filters change
      if (resetPage) {
        next.delete('page')
      }

      return next
    })
  }

  // API params: transform for backend consumption
  const apiParams = {
    ...(params.roles.length && { roles: params.roles.join(',') }),
    ...(params.statuses.length && { statuses: params.statuses.join(',') }),
    page: params.page,
    limit: params.limit
  }

  return { params, apiParams, setParams }
}

export default useUsersTableParams
