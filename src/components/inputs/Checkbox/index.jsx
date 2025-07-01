import './styles.scss'

import clsx from 'clsx'
import { useId } from 'react'

const Checkbox = ({
  name,
  className,
  children,
  size = 'md',
  variant,
  checked,
  onChange,
  ...rest
}) => {
  const uniqueId = useId()
  const inputId = `${name || 'checkbox'}-${uniqueId}`

  const classes = clsx(
    'checkbox',
    {
      [`checkbox--${size}`]: size,
      [`checkbox--${variant}`]: variant
    },
    className
  )

  const inputProps = {
    id: inputId,
    type: 'checkbox',
    name,
    className: 'checkbox__input',
    onChange: onChange || (() => {}),
    checked,
    ...rest
  }

  return (
    <div className={classes}>
      <input {...inputProps} />
      <label className='checkbox__label' htmlFor={inputId}>
        {children ?? ''}
      </label>
    </div>
  )
}

export default Checkbox
