import { useDebouncedValue } from '@tanstack/react-pacer'
import { useEffect, useState } from 'react'

const useDebouncedSearch = (urlValue, onSearch) => {
  // Local state for instant input feedback
  const [instantValue, setInstantValue] = useState(urlValue)
  const [debouncedValue] = useDebouncedValue(instantValue, { wait: 300 })

  // Sync debounced value to URL
  useEffect(() => {
    if (debouncedValue !== urlValue) {
      onSearch(debouncedValue)
    }
  }, [debouncedValue, urlValue, onSearch])

  // Keep local state in sync when URL changes externally, e.g. browser back/forward
  useEffect(() => {
    setInstantValue(urlValue)
  }, [urlValue])

  return { searchValue: instantValue, setSearchValue: setInstantValue }
}

export default useDebouncedSearch
