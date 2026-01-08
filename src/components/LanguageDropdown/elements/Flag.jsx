import flags from '../flags'

const Flag = ({ code, className }) => (
  <img className={className} src={flags[code]} alt={code} />
)

export default Flag
