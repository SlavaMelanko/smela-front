import './styles.scss'

import clsx from 'clsx'

import { LoaderIcon } from '@/components/icons'

const Spinner = ({ size = '2xl', centered = false, className, ...rest }) => (
  <div
    className={clsx('spinner', centered && 'spinner--centered', className)}
    {...rest}
  >
    <LoaderIcon size={size} />
  </div>
)

export default Spinner
