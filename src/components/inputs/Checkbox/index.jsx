import './styles.scss'

import clsx from 'clsx'
import { useId } from 'react'

const Checkbox = ({ name, className, children, ...rest }) => {
  const uniqueId = useId()

  return (
    <div className={clsx('checkbox', className)}>
      <input type='checkbox' name={name} id={`${name}-${uniqueId}`} {...rest} />
      <label className='checkbox__label' htmlFor={`${name}-${uniqueId}`}>
        {children}
      </label>
    </div>
  )
}

export default Checkbox
