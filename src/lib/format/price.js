import { ADAPTERS } from './adapters'

const formatPrice = (value, locale = 'en', currency = 'USD', options = {}) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    ...options
  })

  let formatted = formatter.format(value)

  const adapter = ADAPTERS[locale]

  if (adapter) {
    formatted = adapter.price(formatted)
  }

  return formatted
}

export { formatPrice }
