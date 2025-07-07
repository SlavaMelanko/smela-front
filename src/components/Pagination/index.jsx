import './styles.scss'

import { useState } from 'react'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@/components/icons'
import useLocale from '@/hooks/useLocale'

import RowsPerPage from './limit'
import RowsPerPageDropdown from './RowsPerPageDropdown'

const Pagination = () => {
  const { t } = useLocale()

  const [selected, setSelected] = useState(25)

  const handleSelect = value => {
    setSelected(value)
  }

  const menu = [
    {
      label: RowsPerPage.SM,
      icon: (
        <CheckIcon
          size='xs'
          color={selected === RowsPerPage.SM ? 'green' : 'none'}
        />
      ),
      onClick: () => handleSelect(RowsPerPage.SM)
    },
    {
      label: RowsPerPage.MD,
      icon: (
        <CheckIcon
          size='xs'
          color={selected === RowsPerPage.MD ? 'green' : 'none'}
        />
      ),
      onClick: () => handleSelect(RowsPerPage.MD)
    },
    {
      label: RowsPerPage.LG,
      icon: (
        <CheckIcon
          size='xs'
          color={selected === RowsPerPage.LG ? 'green' : 'none'}
        />
      ),
      onClick: () => handleSelect(RowsPerPage.LG)
    }
  ]

  return (
    <div className='pagination-container'>
      <div className='pagination-container__rows-per-page'>
        <span>{t('pagination.rowsPerPage')}</span>
        <RowsPerPageDropdown label={selected} menu={menu} />
      </div>
      <p>1 - 10 {t('pagination.of')} 100</p>
      <div className='pagination-container__page-buttons'>
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
