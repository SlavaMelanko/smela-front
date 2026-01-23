import { useLocation, useNavigate } from 'react-router-dom'

const useHashTab = (validValues, defaultValue) => {
  const { hash } = useLocation()
  const navigate = useNavigate()

  const hashValue = hash.slice(1)
  const value = validValues.includes(hashValue) ? hashValue : defaultValue

  const setValue = newValue => {
    navigate(`#${newValue}`, { replace: true })
  }

  return [value, setValue]
}

export default useHashTab
