import './styles.scss'

const Tooltip = ({ icon, text }) => (
  <div className='tooltip'>
    <div className='tooltip__icon-wrapper'>{icon}</div>
    <span className='tooltip__text'>{text}</span>
  </div>
)

export default Tooltip
