import './styles.scss'

import clsx from 'clsx'

const FormField = ({ label, name, error, children, required }) => {
  const containerClass = clsx('form-field', {
    'form-field--with-error': !!error,
    'form-field--required': required
  })

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={name} className='form-field__label'>
          {label}
        </label>
      )}

      <div className='form-field__control'>{children}</div>

      {error && <div className='form-field__error'>{error}</div>}
    </div>
  )
}

export default FormField
