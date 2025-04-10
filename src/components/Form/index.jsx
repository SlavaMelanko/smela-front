const FormField = ({ label, name, error, children }) => {
  return (
    <div className={`form-field ${error ? 'form-field--has-error' : ''}`}>
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
