import './styles.scss'

import clsx from 'clsx'

const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  autoComplete = 'off',
  className = '',
  rightElement = null
}) => {
  return (
    <div className='input'>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          'input__field',
          { 'input__field--with-icon': !!rightElement },
          className
        )}
      />
      {rightElement && <div className='input__icon'>{rightElement}</div>}
    </div>
  )
}

export default Input
