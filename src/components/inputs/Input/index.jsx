import './styles.scss'

import clsx from 'clsx'

/* TODO: 
  - Make separate use-form input component for Register
  OR
  - Use react-hook-form for all inputs =>
    refactor login page for react-hook-form.
*/
const Input = ({
  id,
  type = 'text',
  placeholder = '',
  required = false,
  autoComplete = 'off',
  className = '',
  rightElement = null,
  ...rest
}) => {
  return (
    <div className='input'>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className={clsx(
          'input__field',
          { 'input__field--with-icon': !!rightElement },
          className
        )}
        {...rest}
      />
      {rightElement && <div className='input__icon'>{rightElement}</div>}
    </div>
  )
}

export default Input
