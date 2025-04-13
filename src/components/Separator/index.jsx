import './styles.scss'

const Separator = ({ text }) => {
  return (
    <div className='separator'>
      <div className='separator__line-wrapper'>
        <div className='separator__line' />
      </div>
      <div className='separator__text-wrapper'>
        <span className='separator__text'>{text}</span>
      </div>
    </div>
  )
}

export default Separator
