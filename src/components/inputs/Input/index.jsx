import './styles.scss'

import clsx from 'clsx'

const Input = ({
  type = 'text',
  autoComplete = 'off',
  className,
  rightElement,
  error,
  ...rest
}) => {
  return (
    <div className='input'>
      <input
        type={type}
        autoComplete={autoComplete}
        className={clsx(
          'input__field',
          { 'input__field--with-icon': !!rightElement },
          { 'input__field--error': !!error },
          className
        )}
        {...rest}
      />
      {rightElement && <div className='input__icon'>{rightElement}</div>}
    </div>
  )
}

export default Input
