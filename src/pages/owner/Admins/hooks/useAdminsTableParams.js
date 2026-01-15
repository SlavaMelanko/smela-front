import { useSearchParams } from 'react-router-dom'

import { isValidLimit, Limit } from '@/components/Pagination'

const parsePage = pageStr => {
  const page = Number(pageStr)

  return Number.isInteger(page) && page > 0 ? page : 1
}

const parseLimit = limitStr => {
  const limit = Number(limitStr)

  return isValidLimit(limit) ? limit : Limit.SM
}

const useAdminsTableParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = {
    page: parsePage(searchParams.get('page')),
    limit: parseLimit(searchParams.get('limit'))
  }

  const setParams = updates => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          next.delete(key)
        } else {
          next.set(key, String(value))
        }
      })

      return next
    })
  }

  const apiParams = {
    page: params.page,
    limit: params.limit
  }

  return { params, apiParams, setParams }
}

export default useAdminsTableParams
