import './styles.scss'

import { useState } from 'react'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@/components/icons'

import RowsPerPageDropdown from './RowsPerPageDropdown'

const Pagination = () => {
  const [selected, setSelected] = useState(25)

  const handleSelect = value => {
    setSelected(value)
  }

  return (
    <div className='pagination-container'>
      <div className='pagination-container__rows-per-page'>
        <span>Rows per page:</span>
        <RowsPerPageDropdown
          label={selected}
          menu={[
            {
              label: '25',
              icon: (
                <CheckIcon
                  size='xs'
                  color={selected === 25 ? 'green' : 'none'}
                />
              ),
              onClick: () => handleSelect(25)
            },
            {
              label: '50',
              icon: (
                <CheckIcon
                  size='xs'
                  color={selected === 50 ? 'green' : 'none'}
                />
              ),
              onClick: () => handleSelect(50)
            },
            {
              label: '100',
              icon: (
                <CheckIcon
                  size='xs'
                  color={selected === 100 ? 'green' : 'none'}
                />
              ),
              onClick: () => handleSelect(100)
            }
          ]}
        />
      </div>
      <p>1 - 10 of 100</p>
      <div className='pagination-container__buttons'>
        <SecondaryButtonWithIcon
          iconLeft={<ChevronLeftIcon size='xs' color='secondary' />}
        />
        <SecondaryButtonWithIcon
          iconLeft={<ChevronRightIcon size='xs' color='secondary' />}
        />
      </div>
    </div>
  )
}

export default Pagination
