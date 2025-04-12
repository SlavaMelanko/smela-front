import './styles.scss'

import clsx from 'clsx'
import React from 'react'

const FormField = ({ name, label, required, children, error }) => {
  const containerClass = clsx('form-field', {
    'form-field--required': required,
    'form-field--with-error': !!error
  })

  const childrenWrapper = error
    ? React.cloneElement(children, {
        className: clsx(children.props.className, 'input__field--error')
      })
    : children

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={name} className='form-field__label'>
          {label}
        </label>
      )}

      <div className='form-field__control'>{childrenWrapper}</div>

      {error && <div className='form-field__error'>{error}</div>}
    </div>
  )
}

export default FormField
