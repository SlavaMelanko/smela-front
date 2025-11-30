import { datePreset, formatDate } from './date'

describe('formatDate', () => {
  const testDate = '2025-07-04T00:00:00Z'

  test('returns empty string for null input', () => {
    expect(formatDate(null)).toBe('')
  })

  test('returns empty string for undefined input', () => {
    expect(formatDate(undefined)).toBe('')
  })

  test('formats date with numeric preset in en locale (default)', () => {
    const formatted = formatDate(testDate, 'en')

    expect(formatted).toBe('07/04/2025')
  })

  test('formats date with numeric preset in uk locale', () => {
    const formatted = formatDate(testDate, 'uk')

    expect(formatted).toBe('04.07.2025')
  })

  test('formats date with short preset in en locale', () => {
    const formatted = formatDate(testDate, 'en', datePreset.short)

    expect(formatted).toBe('Jul 4, 2025')
  })

  test('formats date with short preset in uk locale', () => {
    const formatted = formatDate(testDate, 'uk', datePreset.short)

    expect(formatted).toBe('4 лип. 2025 р.')
  })

  test('formats date with long preset in en locale', () => {
    const formatted = formatDate(testDate, 'en', datePreset.long)

    expect(formatted).toBe('Friday, July 4, 2025')
  })

  test('formats date with long preset in uk locale', () => {
    const formatted = formatDate(testDate, 'uk', datePreset.long)

    expect(formatted).toMatch(/4 липня 2025/)
  })

  test('formats date with custom options', () => {
    const formatted = formatDate(testDate, 'en', {
      weekday: 'short',
      month: 'long'
    })

    expect(formatted).toContain('Jul')
  })

  test('formats Date object input', () => {
    const dateObj = new Date(testDate)
    const formatted = formatDate(dateObj, 'en')

    expect(formatted).toBe('07/04/2025')
  })

  test('formats timestamp input', () => {
    const timestamp = Date.parse(testDate)
    const formatted = formatDate(timestamp, 'en')

    expect(formatted).toBe('07/04/2025')
  })
})
