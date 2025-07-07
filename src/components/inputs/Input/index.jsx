import './styles.scss'

import clsx from 'clsx'

const Input = ({
  type = 'text',
  autoComplete = 'off',
  className,
  leftElement,
  rightElement,
  error,
  ...rest
}) => {
  return (
    <div className='input'>
      {leftElement && (
        <div className='input__icon input__icon--left'>{leftElement}</div>
      )}
      <input
        type={type}
        autoComplete={autoComplete}
        className={clsx(
          'input__field',
          { 'input__field--with-left-icon': !!leftElement },
          { 'input__field--with-right-icon': !!rightElement },
          { 'input__field--error': !!error },
          className
        )}
        {...rest}
      />
      {rightElement && (
        <div className='input__icon input__icon--right'>{rightElement}</div>
      )}
    </div>
  )
}

export default Input
