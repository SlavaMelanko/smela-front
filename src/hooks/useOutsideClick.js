import { useEffect, useRef, useState } from 'react'

const useOutsideClick = (initialValue = false) => {
  const [isActive, setIsActive] = useState(initialValue)
  const ref = useRef(null)

  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return { ref, isActive, setIsActive }
}

export default useOutsideClick
