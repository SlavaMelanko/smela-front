import { useDebouncedValue } from '@tanstack/react-pacer'
import { useEffect, useRef, useState } from 'react'

const useDebouncedSearch = (urlValue, onSearch) => {
  const [instantValue, setInstantValue] = useState(urlValue)
  const [debouncedValue] = useDebouncedValue(instantValue, { wait: 500 })

  // Track the URL value we expect from our own onSearch calls
  const expectedUrlRef = useRef(urlValue)

  // Update URL using onSearch when debounced value changes
  useEffect(() => {
    if (debouncedValue !== urlValue) {
      expectedUrlRef.current = debouncedValue
      onSearch(debouncedValue)
    }
  }, [debouncedValue, urlValue, onSearch])

  // Sync from URL only for external changes (browser back/forward)
  useEffect(() => {
    if (urlValue !== expectedUrlRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing external state (URL) is valid
      setInstantValue(urlValue)
      expectedUrlRef.current = urlValue
    }
  }, [urlValue])

  return { searchValue: instantValue, setSearchValue: setInstantValue }
}

export default useDebouncedSearch
