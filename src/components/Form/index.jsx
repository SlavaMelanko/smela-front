const FormField = ({ label, name, error, children }) => {
  return (
    <div className='form-field'>
      {label && (
        <label htmlFor={name} className='form-field__label'>
          {label}
        </label>
      )}

      <div className='form-field__control'>{children}</div>

      {error && <p className='form-field__error'>{error}</p>}
    </div>
  )
}

export default FormField
