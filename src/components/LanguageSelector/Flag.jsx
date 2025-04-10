import clsx from 'clsx'

import { isApple } from '@/lib/platform'

import flags from './flags'

const Flag = ({ code, flag, className }) => {
  return isApple() ? (
    <span className={clsx(className)}>{flag}</span>
  ) : (
    <img className={clsx(className)} src={flags[code]} alt={code} />
  )
}

export default Flag
