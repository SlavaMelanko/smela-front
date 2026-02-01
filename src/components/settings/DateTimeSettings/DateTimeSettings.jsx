import { useState } from 'react'

import useLocale from '@/hooks/useLocale'

import { DateFormat } from './DateFormat'
import { TimeFormat } from './TimeFormat'

const getDefaultTimeFormat = locale => {
  // Most European and Asian locales use 24-hour format
  const use24Hour = ['uk', 'de', 'fr', 'es', 'it', 'pl', 'ru', 'ja', 'zh', 'ko']

  return use24Hour.includes(locale) ? '24' : '12'
}

export const DateTimeSettings = () => {
  const { locale } = useLocale()

  const [dateFormat, setDateFormat] = useState('numeric')
  const [timeFormat, setTimeFormat] = useState(() =>
    getDefaultTimeFormat(locale)
  )

  return (
    <div className='flex flex-col gap-6 lg:gap-8'>
      <DateFormat value={dateFormat} onChange={setDateFormat} />
      <TimeFormat value={timeFormat} onChange={setTimeFormat} />
    </div>
  )
}
