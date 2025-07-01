const formatNumber = (value, locale = 'en', options = {}) => {
  return new Intl.NumberFormat(locale, options).format(value)
}

export { formatNumber }
