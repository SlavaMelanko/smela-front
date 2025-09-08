import './styles.scss'

import clsx from 'clsx'

import { LoaderIcon } from '@/components/icons'

const Spinner = ({
  size = 'md',
  centered = false,
  className,
  text,
  ...rest
}) => {
  return (
    <div
      className={clsx('spinner', centered && 'spinner--centered', className)}
      {...rest}
    >
      <div className='spinner__content'>
        <LoaderIcon size={size} />
        {text && <span className='spinner__text'>{text}</span>}
      </div>
    </div>
  )
}

export default Spinner
