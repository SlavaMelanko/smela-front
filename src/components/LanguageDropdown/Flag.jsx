import { cn } from '@/lib/utils'

import flags from './flags'

const Flag = ({ code, className }) => (
  <img className={cn(className)} src={flags[code]} alt={code} />
)

export default Flag
