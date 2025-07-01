import './styles.scss'

import clsx from 'clsx'
import React from 'react'

import useLocale from '@/hooks/useLocale'

const getTranslatedErrorMessage = (error, t) =>
  error?.message ? t(error.message) : null

const FormField = ({ name, label, required, children, error }) => {
  const { t } = useLocale()

  const containerClass = clsx('form-field', {
    'form-field--required': required,
    'form-field--with-error': !!error
  })

  const wrappedChild = React.cloneElement(children, {
    ...children.props,
    name,
    id: name,
    error
  })

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={name} className='form-field__label'>
          {label}
        </label>
      )}

      <div className='form-field__control'>{wrappedChild}</div>

      <div className='form-field__error'>
        {getTranslatedErrorMessage(error, t)}
      </div>
    </div>
  )
}

export default FormField
