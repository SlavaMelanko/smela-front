import './styles.scss'

import clsx from 'clsx'

const Filters = ({ isShow }) => (
  <div
    className={clsx('filters-container', {
      'filters-container--open': isShow
    })}
  >
    <div className='filters-container__content'>
      <p>Filters will be here...</p>
    </div>
  </div>
)

export default Filters
