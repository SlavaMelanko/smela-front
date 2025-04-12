import './styles.scss'

const PrimaryButton = ({ type = 'button', children, onClick }) => {
  return (
    <button type={type} className='primary-button' onClick={onClick}>
      {children}
    </button>
  )
}

export default PrimaryButton
