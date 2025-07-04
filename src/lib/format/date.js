const DATE_FORMAT = {
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

const formatDate = (date, locale = 'en', options = DATE_FORMAT.numeric) => {
  if (!date) return ''

  const parsed =
    typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  return new Intl.DateTimeFormat(locale, options).format(parsed)
}

export { DATE_FORMAT, formatDate }
