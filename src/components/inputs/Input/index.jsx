import './styles.scss'

import clsx from 'clsx'

const Input = ({
  id,
  type = 'text',
  placeholder = '',
  required = false,
  autoComplete = 'off',
  className = '',
  rightElement = null,
  onChange,
  onBlur,
  value,
  name,
  error,
  ...rest
}) => {
  return (
    <div className='input'>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
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
