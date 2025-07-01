import clsx from 'clsx'

import flags from './flags'

const Flag = ({ code, className }) => {
  return <img className={clsx(className)} src={flags[code]} alt={code} />
}

export default Flag
