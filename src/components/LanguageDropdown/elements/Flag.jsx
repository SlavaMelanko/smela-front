import flags from '../flags'

export const Flag = ({ code, className }) => (
  <img className={className} src={flags[code]} alt={code} />
)
