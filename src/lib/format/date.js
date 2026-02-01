export const datePreset = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  },
  long: {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  numeric: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
}

export const formatDate = (
  date,
  locale = 'en',
  options = datePreset.numeric
) => {
  if (!date) {
    return ''
  }

  const parsed =
    typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  return new Intl.DateTimeFormat(locale, options).format(parsed)
}

export const formatTime = (date, locale = 'en', hour12 = false) => {
  if (!date) {
    return ''
  }

  const parsed =
    typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12
  }).format(parsed)
}
