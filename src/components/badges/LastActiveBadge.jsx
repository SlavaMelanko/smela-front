import { useLocale } from '@/hooks/useLocale'

const getLastActiveKey = date => {
  const parsed =
    typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  const seconds = Math.floor((Date.now() - parsed.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return { key: 'lastActive.justNow' }
  }

  if (minutes < 60) {
    return { key: 'lastActive.minute', count: minutes }
  }

  if (hours < 24) {
    return { key: 'lastActive.hour', count: hours }
  }

  if (days < 30) {
    return { key: 'lastActive.day', count: days }
  }

  return { date: parsed }
}

export const LastActiveBadge = ({ date }) => {
  const { t, formatDate } = useLocale()

  if (!date) {
    return null
  }

  const { key, count, date: fallbackDate } = getLastActiveKey(date)

  const label = key
    ? t(key, count !== undefined ? { count } : undefined)
    : formatDate(fallbackDate)

  return <span>{label}</span>
}
