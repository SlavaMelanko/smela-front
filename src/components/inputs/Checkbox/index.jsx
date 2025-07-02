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
    size && `checkbox--${size}`,
    variant && `checkbox--${variant}`,
    className
  )

  return (
    <div className={classes}>
      <input
        id={inputId}
        type='checkbox'
        name={name}
        className='checkbox__input'
        checked={checked}
        onChange={onChange || (() => {})}
        {...rest}
      />
      <label className='checkbox__label' htmlFor={inputId}>
        {children ?? ''}
      </label>
    </div>
  )
}

export default Checkbox
